"use strict";
// Use rxjs to create a state hub for ApiState
// This allows us to use a single source of truth for the api request state
// and updates a global state whenever the api request state changes
// This is useful for showing a global loading state
// and handling errors globally
// This is also useful for caching api requests
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStateHub = exports.REPLY = exports.FS_MANAGEMENT = exports.DB_MANAGEMENT = exports.DB_WRITTING = exports.DB_READING = exports.MERGING = exports.ANALYTICS = exports.SET_MEMORY = exports.QUERY = exports.TRIGGER = exports.SET_ID = exports.EMPTY = void 0;
const rxjs_1 = require("rxjs");
const states_1 = require("./states");
exports.EMPTY = {
    state: states_1.STATES.UNKNOWN,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.SET_ID = {
    state: states_1.STATES.SET_ID,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.TRIGGER = {
    state: states_1.STATES.TRIGGER,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.QUERY = {
    state: states_1.STATES.QUERY,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.SET_MEMORY = {
    state: states_1.STATES.SET_MEMORY,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.ANALYTICS = {
    state: states_1.STATES.ANALYTICS,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.MERGING = {
    state: states_1.STATES.MERGING,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.DB_READING = {
    state: states_1.STATES.DB_READING,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.DB_WRITTING = {
    state: states_1.STATES.DB_WRITTING,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.DB_MANAGEMENT = {
    state: states_1.STATES.DB_MANAGEMENT,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.FS_MANAGEMENT = {
    state: states_1.STATES.FS_MANAGEMENT,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
exports.REPLY = {
    state: states_1.STATES.REPLY,
    request: { messages: [] },
    reply: { ok: false, data: '' }
};
class ApiStateHub {
    constructor() {
        this.ApiState = new rxjs_1.BehaviorSubject(exports.EMPTY);
    }
    static i() {
        if (!ApiStateHub.instance) {
            ApiStateHub.instance = new ApiStateHub();
        }
        return ApiStateHub.instance;
    }
    getApiState() {
        return this.ApiState.asObservable();
    }
    setApiState(ApiState) {
        this.ApiState.next(ApiState);
    }
}
exports.ApiStateHub = ApiStateHub;
