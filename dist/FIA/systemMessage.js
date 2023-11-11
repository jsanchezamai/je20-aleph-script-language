"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemMessage = void 0;
const aleph_script_i18_1 = require("./i18/aleph-script-i18");
function systemMessage(message) {
    return `${aleph_script_i18_1.i18.ME_LABEL}> ${message}`;
}
exports.systemMessage = systemMessage;
