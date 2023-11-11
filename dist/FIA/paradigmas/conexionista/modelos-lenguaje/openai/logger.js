"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LG = void 0;
class LG {
    // Subscribe to hub.ts and log the state changes
    static subscribeState(hub) {
        hub.getApiState().subscribe((state) => {
            console.log("***** AI STATE CHANGE *****");
            console.log("- ", new Date().toISOString(), "AI STATE: ", state);
            console.log("***** -         -- *****");
        });
    }
    static TaskStart(label, ...args) {
        console.log("***** TASK START", label, " *****");
        console.log(...args);
        console.log("***** ---------- *****");
    }
    static Log(...args) {
        console.log(...args);
    }
}
exports.LG = LG;
