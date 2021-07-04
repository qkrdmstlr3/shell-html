"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
var EventType;
(function (EventType) {
    // mouse event
    EventType["click"] = "click";
    EventType["dblclick"] = "dblclick";
    EventType["mousedown"] = "mousedown";
    EventType["mouseup"] = "mouseup";
    EventType["mouseover"] = "mouseover";
    EventType["mouseout"] = "mouseout";
    EventType["mousemove"] = "mousemove";
    // keyboard event
    EventType["keydown"] = "keydown";
    EventType["keyup"] = "keyup";
    EventType["keypress"] = "keypress";
    // form event
    EventType["submit"] = "submit";
    EventType["reset"] = "reset";
    EventType["change"] = "change";
    EventType["focus"] = "focus";
    EventType["blur"] = "blur";
    // document/window event
    EventType["load"] = "load";
    EventType["resize"] = "resize";
    EventType["scroll"] = "scroll";
    EventType["unload"] = "unload";
})(EventType = exports.EventType || (exports.EventType = {}));
//# sourceMappingURL=type.js.map