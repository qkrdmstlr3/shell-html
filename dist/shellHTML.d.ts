import { RenderType, EventFuncType } from "./type";
declare class ShellHTML extends HTMLElement {
    state: any;
    events: EventFuncType[] | undefined;
    constructor(state?: unknown);
    disconnectedCallback(): void;
    /**
     * DOM Tree
     */
    /**
     * FIXME:
     * reflow or repaint may occur
     * need to change the way which compare each node of the tree.
     */
    compareAndReplaceNodeTree(oldDOM: ShadowRoot, newDOM: HTMLDivElement, newDOMChilds: NodeListOf<ChildNode>): void;
    /**
     * state
     */
    setState(state: unknown): void;
    getElementById(id: string): HTMLElement | null;
    querySelector(tag: string): HTMLElement | null;
    enrollObserving(key: string): void;
    releaseObserving(key: string): void;
    /**
     * Rendering
     */
    render(): RenderType | void;
    renderFirst({ html, eventFuncs, css }: RenderType, dom: ShadowRoot): void;
    renderCSS(css: string, dom: ShadowRoot): void;
    getEventListner(event: Event, { className, func }: EventFuncType): void;
    eventDelegation({ className, func, type }: EventFuncType, dom: ShadowRoot): void;
    removeEvents(): void;
    rerender(): void;
}
export default ShellHTML;
