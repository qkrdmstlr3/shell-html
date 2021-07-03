/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * To manage global state
 * Used for state management between components
 */
import { AtomType } from './type';

interface KeyValueType {
  [key: string]: any;
}

class Store {
  states: KeyValueType; // state
  components: KeyValueType;

  constructor() {
    this.states = {};
    this.components = {};
  }

  observe(key: string, component: any, func: any): void {
    this.components[key].push([component, func]);
  }

  disobserve(key: string, component: any): void {
    const index = this.components[key].findIndex(([c]: any) => c === component);
    this.components[key].splice(index, 1);
  }

  addState({ key, initial }: AtomType): void {
    this.components[key] = [];
    this.states[key] = initial;
  }

  setGlobalState(key: string, value: any): void {
    if (this.states[key] && this.states[key] != value) {
      this.states[key] = value;
      this.components[key].forEach(([component, func]: any) => {
        func.call(component);
      });
    }
  }
}

const store = new Store();

export function state(pearlData: AtomType): void {
  store.addState(pearlData);
}

export function useGlobalState(key: string): any {
  return store.states[key]; // FIXME: have to ensure immutability
}

export function setGlobalState(key: string, value: any): void {
  store.setGlobalState(key, value);
}

export function observe(key: string, component: any, func: any) {
  store.observe(key, component, func);
}

export function disObserve(key: string, component: any) {
  store.disobserve(key, component);
}

export default Store;
