"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellHTML = exports.setGlobalState = exports.useGlobalState = exports.state = exports.createComponent = exports.render = exports.EventType = void 0;
var type_1 = require("./type");
Object.defineProperty(exports, "EventType", { enumerable: true, get: function () { return type_1.EventType; } });
var manage_1 = require("./manage");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return manage_1.render; } });
Object.defineProperty(exports, "createComponent", { enumerable: true, get: function () { return manage_1.createComponent; } });
var state_1 = require("./state");
Object.defineProperty(exports, "state", { enumerable: true, get: function () { return state_1.state; } });
Object.defineProperty(exports, "useGlobalState", { enumerable: true, get: function () { return state_1.useGlobalState; } });
Object.defineProperty(exports, "setGlobalState", { enumerable: true, get: function () { return state_1.setGlobalState; } });
var shellHTML_1 = require("./shellHTML");
Object.defineProperty(exports, "ShellHTML", { enumerable: true, get: function () { return shellHTML_1.default; } });
//# sourceMappingURL=index.js.map