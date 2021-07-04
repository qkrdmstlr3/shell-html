"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.render = void 0;
function render(ElementName, dom) {
    if (dom) {
        dom.innerHTML = `<${ElementName}/>`;
    }
}
exports.render = render;
function createComponent(name, component) {
    customElements.define(name, component);
}
exports.createComponent = createComponent;
//# sourceMappingURL=manage.js.map