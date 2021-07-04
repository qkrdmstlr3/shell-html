"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
class ShellHTML extends HTMLElement {
    constructor(state = null) {
        super();
        this.state = state; // TODO: immutability must be guaranteed
        this.attachShadow({ mode: 'open' });
        const element = this.render();
        if (element && this.shadowRoot) {
            this.renderFirst(element, this.shadowRoot);
        }
    }
    disconnectedCallback() {
        this.removeEvents();
    }
    /**
     * DOM Tree
     */
    /**
     * FIXME:
     * reflow or repaint may occur
     * need to change the way which compare each node of the tree.
     */
    compareAndReplaceNodeTree(oldDOM, newDOM, newDOMChilds) {
        if (!newDOMChilds.length)
            return;
        for (let i = 0; i < newDOMChilds.length; i += 1) {
            const newDOMChild = newDOMChilds[i];
            if (newDOMChild.nodeName.includes('-')) {
                const oldDOMElement = oldDOM.getElementById(newDOMChild.id);
                if (oldDOMElement) {
                    newDOMChild.replaceWith(oldDOMElement);
                }
            }
            this.compareAndReplaceNodeTree(oldDOM, newDOM, newDOMChild.childNodes);
        }
    }
    /**
     * state
     */
    setState(state) {
        if (this.state !== state) {
            this.state = state;
            this.rerender();
        }
    }
    getElement(id) {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById(id);
        }
        return null;
    }
    enrollObserving(key) {
        state_1.observe(key, this, this.rerender);
    }
    releaseObserving(key) {
        state_1.disObserve(key, this);
    }
    /**
     * Rendering
     */
    render() {
        // overriding
    }
    renderFirst({ html = '', eventFuncs = [], css }, dom) {
        // FIXME: applying sanitize html
        dom.innerHTML = html.trim().replace(/>[ |\n]*</g, '><');
        if (css) {
            this.renderCSS(css, dom);
        }
        // ShadowRoot Event Delegation
        this.events = eventFuncs;
        eventFuncs.forEach((eventFunc) => this.eventDelegation(eventFunc, dom));
    }
    renderCSS(css, dom) {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        dom.appendChild(style);
    }
    getEventListner(event, { className, func }) {
        event.stopPropagation();
        const isCorrectElement = (event.target instanceof HTMLElement ||
            event.target instanceof SVGElement) &&
            event.target.closest(`.${className}`);
        if (isCorrectElement) {
            func.call(this, event);
        }
    }
    eventDelegation({ className, func, type }, dom) {
        dom.addEventListener(type, (event) => this.getEventListner(event, { className, func, type }));
    }
    removeEvents() {
        if (!this.events)
            return;
        this.events.forEach(({ className, func, type }) => {
            var _a;
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.removeEventListener(type, (event) => this.getEventListner(event, { className, func, type }));
        });
    }
    rerender() {
        var _a;
        const element = this.render();
        if (element && element.html) {
            const oldDOM = this.shadowRoot;
            const newDOM = document.createElement('div');
            newDOM.innerHTML = element.html.trim().replace(/>[ |\n]*</g, '><');
            if (!oldDOM || oldDOM.textContent == newDOM.textContent)
                return;
            this.compareAndReplaceNodeTree(oldDOM, newDOM, newDOM.childNodes);
            (_a = oldDOM.childNodes[0]) === null || _a === void 0 ? void 0 : _a.replaceWith(newDOM.childNodes[0]);
        }
    }
}
exports.default = ShellHTML;
//# sourceMappingURL=shellHTML.js.map