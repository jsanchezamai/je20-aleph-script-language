"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.convertDate = exports.BOOK_TYPES = exports.EMPTY_LABEL = void 0;
const path = require("path");
const auth = require('../../package.json');
const fs_1 = require("fs");
const lite_1 = require("./memoria/lite");
const openai_1 = require("./openai");
const hub_1 = require("./state/hub");
const states_1 = require("./state/states");
exports.EMPTY_LABEL = "EMPTY";
var BOOK_TYPES;
(function (BOOK_TYPES) {
    BOOK_TYPES["CHAPTER"] = "CHAPTER";
    BOOK_TYPES["BOOK"] = "BOOK";
})(BOOK_TYPES || (exports.BOOK_TYPES = BOOK_TYPES = {}));
function convertDate(date) {
    return (date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        "_" +
        ("0" + date.getHours()).slice(-2) +
        "-" +
        ("0" + date.getMinutes()).slice(-2) +
        "-" +
        ("0" + date.getSeconds()).slice(-2));
}
exports.convertDate = convertDate;
class Book {
    constructor(folder) {
        this.folder = folder;
        this.db = "data.db";
        this.uiIndex = {};
        this.entries = [];
        this.type = BOOK_TYPES.CHAPTER;
        this.rowsi = 0;
        if (!folder) {
            this.fsError = true;
            return;
        }
        this.folder = this.folder.trim();
        this.title = folder;
        let fpath = path.join(auth.openai.memory, folder.trim());
        if (!(0, fs_1.existsSync)(fpath)) {
            try {
                (0, fs_1.mkdirSync)(fpath);
                this.saFeAccessToExportFolder();
                this.fsError = false;
            }
            catch (e) {
                this.fsError = true;
                return;
            }
        }
    }
    static exists(key) {
        return (0, fs_1.existsSync)(path.join(auth.openai.memory, key));
    }
    static getBooksList() {
        const dir = auth.openai.memory;
        const files = (0, fs_1.readdirSync)(dir);
        let str = "";
        files.forEach((file) => {
            str += `- ${file}\n`;
        });
        const label = openai_1.userLabels
            .MENU_TITLE_BOOK_LIST.replace("%items", files.length.toString());
        return label + "\n" + str;
    }
    getPath() {
        return path.join(auth.openai.memory, this.folder);
    }
    getDbFile() {
        return path.join(this.getPath(), this.db);
    }
    getExportFolder() {
        return path.join(this.getPath(), "export");
    }
    saFeAccessToExportFolder() {
        const folder = this.getExportFolder().trim();
        if (!(0, fs_1.existsSync)(folder)) {
            // console.log("Creating export folder:", folder);
            (0, fs_1.mkdirSync)(folder);
        }
    }
    exportRowAsMarkdown(row) {
        // console.log("Generating ExportFile for row. Current mood:", row.who);
        try {
            this.saFeAccessToExportFolder();
            const dateLabel = convertDate(new Date(row.timestamp));
            const filename = path.join(this.getExportFolder(), `${dateLabel}.md`);
            if ((0, fs_1.existsSync)(filename)) {
                return;
            }
            // console.log("*** Creating file for:", filename);
            (0, fs_1.writeFileSync)(filename, `${row.id}-${dateLabel} \n # Who  \n ${row.who} \n  # Prompt \n  ${row.prompt}\n\n ## Keys\n\n \`\`\`json \n ${row.keys} \n \`\`\` \n\n ## Mem\n\n \`\`\`json \n ${row.mem} \n \`\`\` \n\n ## Content\n\n${row.content}`);
            return true;
        }
        catch (error) {
            console.warn("Generating ExportFile for row. Failed", error.message);
            return false;
        }
    }
    exportRowJson(row) {
        console.log("Generating ExportFile for row. Current mood:", row.who);
        try {
            this.saFeAccessToExportFolder();
            row.timestamp = new Date(); // TO BATCH SANITIZE EXPORT NEW TIMESTAMP
            row.timestamp.setMinutes(++this.rowsi);
            const dateLabel = convertDate(new lite_1.cEntry(row).getTimestamp());
            const filename = path.join(this.getExportFolder(), `${dateLabel}.json`);
            // if (existsSync(filename)) {
            //	return;
            //}
            // console.log("*** Creating file for:", filename);
            this.inflateObjects(row);
            (0, fs_1.writeFileSync)(filename, JSON.stringify(row, null, "\t"));
            return true;
        }
        catch (error) {
            console.warn("!!!!! Generating ExportFile for row. Failed", error.message);
            return false;
        }
    }
    inflateObjects(row) {
        try {
            row.keys = JSON.parse(row.keys);
        }
        catch (error) {
        }
        try {
            row.mem = JSON.parse(row.mem);
        }
        catch (error) {
        }
    }
    getRowsFromJsonFolder(book) {
        hub_1.FS_MANAGEMENT.state = states_1.STATES.FS_READING;
        hub_1.FS_MANAGEMENT.reply.data = "Reading export folder:" + book.getExportFolder();
        hub_1.ApiStateHub.i().setApiState(hub_1.FS_MANAGEMENT);
        // Retrieve array of Entry from json files in export folder
        const files = (0, fs_1.readdirSync)(book.getExportFolder()).filter(f => f.includes(".json"));
        hub_1.FS_MANAGEMENT.reply.data = " ITEMS = " + files.length;
        hub_1.ApiStateHub.i().setApiState(hub_1.FS_MANAGEMENT);
        book.entries = [];
        files.forEach((file) => {
            try {
                const data = (0, fs_1.readFileSync)(path.join(book.getExportFolder(), file), "utf8");
                const entry = JSON.parse(data);
                book.entries.push(entry);
            }
            catch (error) {
                console.warn("Error parsing file:", file);
            }
        });
        hub_1.FS_MANAGEMENT.state = states_1.STATES.FS_MANAGEMENT;
        hub_1.FS_MANAGEMENT.reply.data = " SUCCESS ITEMS = " + book.entries.length + " OF " + files.length;
        hub_1.ApiStateHub.i().setApiState(hub_1.FS_MANAGEMENT);
        return book.entries;
    }
    addEntry(entry) {
        this.entries.push(entry);
    }
    rowAsExportFileName(row) {
        return convertDate(new Date(row.timestamp)) + ".md";
    }
    getExportFilenameFullPath(row) {
        if (!row)
            return exports.EMPTY_LABEL;
        const name = this.rowAsExportFileName(row);
        if (name == exports.EMPTY_LABEL) {
            return exports.EMPTY_LABEL;
        }
        else {
            return path.join(this.getExportFolder(), name);
        }
    }
    async getBookEntries(dbRows) {
        switch (this.type) {
            case BOOK_TYPES.CHAPTER:
                return await this.getBookEntriesAsChapterList(dbRows);
            case BOOK_TYPES.BOOK:
                return await this.getBookEntriesAsMenuOption(dbRows);
            default:
                return '';
        }
    }
    async getBookEntriesAsChapterList(dbRows) {
        console.log("Generating list for", this.title, "with", dbRows.length, "rows");
        if (!dbRows)
            return exports.EMPTY_LABEL;
        let out = ' \n ';
        // for each row in dbRows checks if fields has : simbol in the keys, if so, renames the key droping the : simbol
        dbRows.forEach((row, index) => {
            // console.log("Parsing keys for row", row);
            try {
                const keys = JSON.parse(row.keys);
                out += `- [${row.id}] ${keys.Topic}; \n 	- pov: (*${row.who}*) \n `;
            }
            catch (error) {
                console.warn("Error parsing keys for row", row, error.message);
            }
        });
        let output = "\n" + openai_1.userLabels.MENU_TITLE_PAGES_LIST
            .replace("%items", dbRows.length + "");
        return output + out;
    }
    // This functions reduces de current list of file in memory folder.
    // It generates a list of files grouped by year, month, day and hour.
    async getBookEntriesAsMenuOption(dbRows) {
        console.log("Generating list for", this.title, "with", dbRows.length, "rows");
        if (!dbRows)
            return exports.EMPTY_LABEL;
        // for each row in dbRows checks if fields has : simbol in the keys, if so, renames the key droping the : simbol
        dbRows.forEach((row, index) => {
            // console.log("Parsing keys for row", row);
            try {
                const keys = JSON.parse(row.keys);
                const newKeys = {};
                for (const key in keys) {
                    const newKey = key.replace(":", "").replace("\\", "");
                    newKeys[newKey] = keys[key];
                }
                dbRows[index].keys = JSON.stringify(newKeys);
            }
            catch (error) {
                console.warn("Error parsing keys for row", row, error.message);
            }
        });
        this.uiIndex = {};
        const result = dbRows.reduce((acc, row, rIndex) => {
            // const fileDate = row.split("_")[0] + " " + (row.split("_")[1]).replace(/-/g, ":").replace(".md", "");
            const fileDate = row.timestamp;
            const date = new Date(fileDate);
            //  // console.log("*Parsing list memory for", fileDate);
            //  // console.log("Generating list for step", row, " date ", date, fileDate);
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);
            const hour = ("0" + date.getHours()).slice(-2);
            const min = ("0" + date.getMinutes()).slice(-2);
            const second = ("0" + date.getSeconds()).slice(-2);
            const filename = `${convertDate(date)}.md`;
            const filepath = path.join(auth.openai.memory, filename);
            const title = `${year}-${month}-${day} ${hour}:00`;
            //  // console.log("   - Searching for topic for row: ", row);
            const topicObj = this.getTopicFromRow(row);
            // console.log(" - Building memory, topicObj: ", topicObj, year, month, day, hour, min, second);
            const dateLabel = convertDate(new Date(row.timestamp));
            this.uiIndex['s' + (rIndex + 1)] = dateLabel;
            const item = (rIndex + 1) + ": " + topicObj;
            //  // console.log("***MEMO -CHECK: index/topic/file ", rIndex , row, rIndex, topicObj);
            rIndex++;
            if (!acc[year]) {
                acc[year] = {};
            }
            if (!acc[year][month]) {
                acc[year][month] = {};
            }
            if (!acc[year][month][day]) {
                acc[year][month][day] = {};
            }
            if (!acc[year][month][day][hour]) {
                acc[year][month][day][hour] = {};
            }
            if (!acc[year][month][day][hour][min]) {
                acc[year][month][day][hour][min] = {};
            }
            if (!acc[year][month][day][hour][min][second]) {
                acc[year][month][day][hour][min][second] = item;
            }
            return acc;
        }, {});
        // console.log("**** Producing the UI memory list, for n", dbRows.length);
        let output = "\n" + openai_1.userLabels.MENU_TITLE_PAGES_LIST
            .replace("%items", dbRows.length + "") + "\n";
        for (const year in result) {
            output += `Año: ${year}\n`;
            for (const month in result[year]) {
                output += ` - Mes: ${month}\n`;
                for (const day in result[year][month]) {
                    output += `   - Día: ${day}\n`;
                    // console.log(result[year][month][day]);
                    for (const hour in result[year][month][day]) {
                        output += `     - Hora: ${hour}\n `;
                        for (const minute in result[year][month][day][hour]) {
                            for (const second in result[year][month][day][hour][minute]) {
                                output += `       - ${minute}:${second} -> ${result[year][month][day][hour][minute][second]}\n`;
                            }
                        }
                    }
                }
            }
        }
        return output;
    }
    getTopicFromRow(row) {
        // console.log("   - Searching for topic for row: ", row?.id);
        let topic = this.getTopicFromMemRow(row, "keys");
        if (!topic) {
            // console.log("   - No topic found in keys, searching in deep keys");
            topic = this.getDeepTopicFromRow(row);
            if (!topic) {
                // console.log("   - No topic found in deep keys, searching in mem");
                topic = this.getTopicFromMemRow(row, "mem");
            }
        }
        return (topic || "").replace("\n", "");
    }
    getDeepTopicFromRow(row) {
        let strkeys = "";
        let topicObj;
        try {
            // console.log("");
            if (row && typeof row.keys === "object") {
                // console.log("Key.topic.found!!")
                topicObj = row.keys.Topic;
            }
            else {
                const init = row.keys.indexOf("{");
                const final = row.keys.indexOf("}");
                strkeys = row.keys.substring(init, final + 1);
                topicObj = JSON.parse(strkeys);
                //  // console.log("   - Memory has been readed! Got mem.keys object with topic:", topicObj.Topic);
                if (topicObj.Topic) {
                    topicObj = topicObj.Topic;
                }
            }
            //  // console.log("Extracting topic from ", index, topicObj.Topic);
            if (!topicObj.Topic) {
                //  // console.log("No topic found for ", index, topicObj);
            }
        }
        catch (error) {
            // console.log("** COULD NOT PARSE DE DB KEYS FIELD TO EXTRACT THE TOPIC. Keys", row?.keys, "StringKeys", strkeys);
            //  // console.log("*** No topic at", row, rIndex, topicObj, error.message);
            topicObj = "?\n";
        }
        return topicObj;
    }
    getTopicFromMemRow(row, field) {
        let topic = "";
        try {
            const mem = JSON.parse(row[field]);
            topic = mem.Topic || mem.topic;
        }
        catch (error) {
        }
        return (topic || "").replace("\n", "");
    }
}
exports.Book = Book;
