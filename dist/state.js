"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disObserve = exports.observe = exports.setGlobalState = exports.useGlobalState = exports.state = void 0;
class Store {
    constructor() {
        this.states = {};
        this.components = {};
    }
    observe(key, component, func) {
        this.components[key].push([component, func]);
    }
    disobserve(key, component) {
        const index = this.components[key].findIndex(([c]) => c === component);
        this.components[key].splice(index, 1);
    }
    addState({ key, initial }) {
        this.components[key] = [];
        this.states[key] = initial;
    }
    setGlobalState(key, value) {
        if (this.states[key] && this.states[key] != value) {
            this.states[key] = value;
            this.components[key].forEach(([component, func]) => {
                func.call(component);
            });
        }
    }
}
const store = new Store();
function state(stateData) {
    store.addState(stateData);
}
exports.state = state;
function useGlobalState(key) {
    return store.states[key]; // FIXME: have to ensure immutability
}
exports.useGlobalState = useGlobalState;
function setGlobalState(key, value) {
    store.setGlobalState(key, value);
}
exports.setGlobalState = setGlobalState;
function observe(key, component, func) {
    store.observe(key, component, func);
}
exports.observe = observe;
function disObserve(key, component) {
    store.disobserve(key, component);
}
exports.disObserve = disObserve;
exports.default = Store;
//# sourceMappingURL=state.js.map