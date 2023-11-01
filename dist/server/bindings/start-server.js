"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const haskell_server_1 = require("./haskell/haskell-server");
console.log("Create HaskellServer");
const s = new haskell_server_1.HaskellServer();
process.on('exit', () => {
    s.haskellProcess.stdin.end();
});
