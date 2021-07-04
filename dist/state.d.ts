/**
 * To manage global state
 * Used for state management between components
 */
import { AtomType } from "./type";
interface KeyValueType {
    [key: string]: any;
}
declare class Store {
    states: KeyValueType;
    components: KeyValueType;
    constructor();
    observe(key: string, component: any, func: any): void;
    disobserve(key: string, component: any): void;
    addState({ key, initial }: AtomType): void;
    setGlobalState(key: string, value: any): void;
}
export declare function state(stateData: AtomType): void;
export declare function useGlobalState(key: string): any;
export declare function setGlobalState(key: string, value: any): void;
export declare function observe(key: string, component: any, func: any): void;
export declare function disObserve(key: string, component: any): void;
export default Store;
