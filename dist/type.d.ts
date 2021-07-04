export declare enum EventType {
    click = "click",
    dblclick = "dblclick",
    mousedown = "mousedown",
    mouseup = "mouseup",
    mouseover = "mouseover",
    mouseout = "mouseout",
    mousemove = "mousemove",
    keydown = "keydown",
    keyup = "keyup",
    keypress = "keypress",
    submit = "submit",
    reset = "reset",
    change = "change",
    focus = "focus",
    blur = "blur",
    load = "load",
    resize = "resize",
    scroll = "scroll",
    unload = "unload"
}
export interface EventFuncType {
    className: string;
    func: (args: Event) => void;
    type: EventType;
}
export interface RenderType {
    html?: string;
    eventFuncs?: EventFuncType[];
    css?: string;
}
/**
 * state Type
 */
export interface AtomType {
    key: string;
    initial: any;
}
