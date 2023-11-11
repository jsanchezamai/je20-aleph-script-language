"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lite = exports.cEntry = void 0;
const auth = require('../../../package.json');
const fs = require("fs");
const sqlite3_1 = require("sqlite3");
const util_1 = require("util");
const book_1 = require("../book");
const hub_1 = require("../state/hub");
const states_1 = require("../state/states");
class cEntry {
    constructor(entry) {
        this.id = entry.id;
        this.who = entry.who;
        this.timestamp = entry.timestamp;
        this.prompt = entry.prompt;
        this.keys = entry.keys;
        this.mem = entry.mem;
        this.content = entry.content;
    }
    getTimestamp() {
        let date;
        try {
            date = new Date(this.timestamp);
            if (this.timestamp instanceof Date) {
                date = this.timestamp;
            }
        }
        catch (error) {
            date = new Date(this.timestamp);
        }
        return date;
    }
    getStringified(data) {
        if (typeof data === "object") {
            return JSON.stringify(data);
        }
        else {
            return data;
        }
    }
}
exports.cEntry = cEntry;
class Lite {
    constructor() {
        if (!fs.existsSync(auth.openai.memory)) {
            fs.mkdirSync(auth.openai.memory);
        }
    }
    async init(book) {
        // console.log("Initializing ACCES for book:", book.getDbFile());
        if (!fs.existsSync(book.getPath())) {
            fs.mkdirSync(book.getPath());
        }
        if (!fs.existsSync(book.getDbFile())) {
            // console.log("Creating database for book:", book.getDbFile());
            const db = new sqlite3_1.Database(book.getDbFile());
            const run = (0, util_1.promisify)(db.run.bind(db));
            await run(`CREATE TABLE IF NOT EXISTS entries (
				id INTEGER PRIMARY KEY AUTOINCREMENT ,
				who TEXT,
				timestamp TEXT,
				prompt TEXT,
				keys TEXT,
				mem TEXT,
				content TEXT
			)`);
            db.close();
        }
        // console.log("Database initialized");
    }
    async add(book, entry) {
        // ApiStateHub.i().setApiState(DB_WRITTING );
        console.log("Adding entry:" /*, entry*/);
        const db = await this.gDb(book);
        const run = (0, util_1.promisify)(db.run.bind(db));
        await run(`INSERT INTO entries (who, timestamp, prompt, keys, mem, content) VALUES ( ?, ?, ?, ?, ?, ?)`, entry.who, entry.getTimestamp(), entry.prompt, entry.getStringified(entry.keys), entry.getStringified(entry.mem), entry.content);
        db.close();
    }
    async gDb(book) {
        if (!book) {
            book = new book_1.Book("default");
        }
        await this.init(book);
        return new sqlite3_1.Database(book.getDbFile());
    }
    async search(book, field, value) {
        hub_1.ApiStateHub.i().setApiState(hub_1.DB_READING);
        // console.log("Searching for:", field, value);
        const db = await this.gDb(book);
        const all = (0, util_1.promisify)(db.all.bind(db));
        const rows = await all(`SELECT id, who, timestamp, prompt, keys, mem, content FROM entries WHERE ${field} LIKE ?`, `%${value}%`);
        db.close();
        return rows.map((row) => ({
            id: row.id,
            who: row.who,
            timestamp: new Date(row.timestamp),
            prompt: row.prompt,
            keys: row.keys,
            mem: row.mem,
            content: row.content,
        }));
    }
    async getById(book, value) {
        // ApiStateHub.i().setApiState(DB_READING );
        // console.log("getById for:", value);
        const db = await this.gDb(book);
        const all = (0, util_1.promisify)(db.all.bind(db));
        const rows = await all(`SELECT id, who, timestamp, prompt, keys, mem, content FROM entries WHERE id = ${value}`);
        db.close();
        if (rows.length > 0) {
            return rows.map((row) => ({
                id: row.id,
                who: row.who,
                timestamp: new Date(row.timestamp),
                prompt: row.prompt,
                keys: row.keys,
                mem: row.mem,
                content: row.content,
            }))[0];
        }
        else {
            return null;
        }
    }
    async getAll(book) {
        hub_1.ApiStateHub.i().setApiState(hub_1.DB_READING);
        // console.log("getAll for:", book.title);
        const db = await this.gDb(book);
        const all = (0, util_1.promisify)(db.all.bind(db));
        const rows = await all(`SELECT id, who, timestamp, prompt, keys, mem, content FROM entries ORDER BY id ASC`);
        db.close();
        return rows.map((row) => ({
            id: row.id,
            who: row.who,
            timestamp: new Date(row.timestamp),
            prompt: row.prompt,
            keys: row.keys,
            mem: row.mem,
            content: row.content,
        }));
    }
    async exportMarkdown(book) {
        const db = await this.gDb(book);
        const all = (0, util_1.promisify)(db.all.bind(db));
        const rows = await all(`SELECT id, who, timestamp, prompt, keys, mem, content FROM entries ORDER BY timestamp DESC`);
        book.saFeAccessToExportFolder();
        // console.log("** Going to export all rows in db as markdown files. For rows: ", rows.length);
        rows.forEach((row, index) => {
            book.exportRowAsMarkdown(row);
        });
        db.close();
    }
    async exportJson(book) {
        if (!book || !book.title) {
            console.warn("No book to export into");
            return false;
        }
        hub_1.DB_MANAGEMENT.state = states_1.STATES.DB_READING;
        const rows = await this.getAll(book);
        hub_1.DB_MANAGEMENT.reply.data = " rows = " + rows.length;
        hub_1.ApiStateHub.i().setApiState(hub_1.DB_MANAGEMENT);
        book.saFeAccessToExportFolder();
        let exported = 0;
        // console.log("** Going to export all rows in db as markdown files. For rows: ", rows.length);
        rows.forEach((row, index) => {
            try {
                if (book.exportRowJson(row))
                    exported++;
            }
            catch (error) {
                console.warn("Error exportRowJson: ", row.id, error.message);
            }
        });
        hub_1.DB_MANAGEMENT.reply.data = " succeded exported " + exported + " of rows = " + rows.length;
        hub_1.ApiStateHub.i().setApiState(hub_1.DB_MANAGEMENT);
        return true;
    }
    async importJson(book) {
        if (!book || !book.title) {
            console.warn("No book to import into");
            return false;
        }
        // Prepare db
        const db = await this.gDb(book);
        db.close();
        // Access to json folder
        book.getRowsFromJsonFolder(book);
        hub_1.DB_MANAGEMENT.state = states_1.STATES.FS_MANAGEMENT;
        hub_1.DB_MANAGEMENT.reply.data = " rows = " + book.entries.length;
        hub_1.ApiStateHub.i().setApiState(hub_1.DB_MANAGEMENT);
        book.entries.forEach(async (row, index) => {
            try {
                const exists = await this.getById(book, row.id);
                if (exists) { // Update
                    this.update(book, new cEntry(row));
                }
                else { // Insert
                    this.add(book, new cEntry(row));
                }
            }
            catch (error) {
                console.warn("Error updating row: ", row.id, error.message);
                return false;
            }
        });
        return true;
    }
    // Generate update method
    async update(book, entry_) {
        console.log("Update entry:" /*, entry*/);
        const db = await this.gDb(book);
        const run = (0, util_1.promisify)(db.run.bind(db));
        const updateQuery = `
		  UPDATE entries
		  SET
			who = ?,
			timestamp = ?,
			prompt = ?,
			keys = ?,
			mem = ?,
			content = ?
		  WHERE id = ?;
		`;
        const entry = new cEntry(entry_);
        try {
            // Generate sql update for table: entries and fields (who, timestamp, prompt, keys, mem, content)
            const result = await run(`${updateQuery}`, entry.who, entry.getTimestamp(), entry.prompt, entry.getStringified(entry.keys), entry.getStringified(entry.mem), entry.content, entry.id);
            hub_1.DB_MANAGEMENT.state = states_1.STATES.DB_WRITING;
            hub_1.DB_MANAGEMENT.reply.data = " result = " + result;
            // ApiStateHub.i().setApiState(DB_MANAGEMENT);
        }
        catch (error) {
            console.warn("Error updating entry: ", entry.id, error.message);
        }
        db.close();
    }
}
exports.Lite = Lite;
