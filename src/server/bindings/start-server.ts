import { HaskellServer } from "./haskell/haskell-server";

console.log("Create HaskellServer");

const s = new HaskellServer(); 
process.on('exit', () => {
    s.haskellProcess.stdin.end();
});