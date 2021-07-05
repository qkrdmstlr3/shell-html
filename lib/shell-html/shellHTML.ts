import { RenderType, EventFuncType } from "./type";
import { observe, disObserve } from "./state";

class ShellHTML extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;
  events: EventFuncType[] | undefined;

  constructor(state: unknown = null) {
    super();
    this.state = state; // TODO: immutability must be guaranteed

    this.attachShadow({ mode: "open" });
    const element = this.render();

    if (element && this.shadowRoot) {
      this.renderFirst(element, this.shadowRoot);
    }
  }

  disconnectedCallback(): void {
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
  compareAndReplaceNodeTree(
    oldDOM: ShadowRoot,
    newDOM: HTMLDivElement,
    newDOMChilds: NodeListOf<ChildNode>
  ): void {
    if (!newDOMChilds.length) return;

    for (let i = 0; i < newDOMChilds.length; i += 1) {
      const newDOMChild = newDOMChilds[i] as HTMLElement;

      if (newDOMChild.nodeName.includes("-")) {
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
  setState(state: unknown): void {
    if (this.state !== state) {
      this.state = state;

      this.rerender();
    }
  }

  getElementById(id: string): HTMLElement | null {
    if (this.shadowRoot) {
      return this.shadowRoot.getElementById(id);
    }
    return null;
  }

  querySelector(tag: string): HTMLElement | null {
    if (this.shadowRoot) {
      return this.shadowRoot.querySelector(tag);
    }
    return null;
  }

  enrollObserving(key: string): void {
    observe(key, this, this.rerender);
  }

  releaseObserving(key: string): void {
    disObserve(key, this);
  }

  /**
   * Rendering
   */
  render(): RenderType | void {
    // overriding
  }

  renderFirst(
    { html = "", eventFuncs = [], css }: RenderType,
    dom: ShadowRoot
  ): void {
    // FIXME: applying sanitize html
    dom.innerHTML = html.trim().replace(/>[ |\n]*</g, "><");

    if (css) {
      this.renderCSS(css, dom);
    }

    // ShadowRoot Event Delegation
    this.events = eventFuncs;
    eventFuncs.forEach((eventFunc) => this.eventDelegation(eventFunc, dom));
  }

  renderCSS(css: string, dom: ShadowRoot): void {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    dom.appendChild(style);
  }

  getEventListner(event: Event, { className, func }: EventFuncType): void {
    event.stopPropagation();
    const isCorrectElement =
      (event.target instanceof HTMLElement ||
        event.target instanceof SVGElement) &&
      event.target.closest(`.${className}`);

    if (isCorrectElement) {
      func.call(this, event);
    }
  }

  eventDelegation(
    { className, func, type }: EventFuncType,
    dom: ShadowRoot
  ): void {
    dom.addEventListener(type, (event: Event) =>
      this.getEventListner(event, { className, func, type })
    );
  }

  removeEvents(): void {
    if (!this.events) return;

    this.events.forEach(({ className, func, type }) => {
      this.shadowRoot?.removeEventListener(type, (event: Event) =>
        this.getEventListner(event, { className, func, type })
      );
    });
  }

  rerender(): void {
    const element = this.render();

    if (element && element.html) {
      const oldDOM = this.shadowRoot;
      const newDOM = document.createElement("div");
      newDOM.innerHTML = element.html.trim().replace(/>[ |\n]*</g, "><");

      if (!oldDOM || oldDOM.textContent == newDOM.textContent) return;
      this.compareAndReplaceNodeTree(oldDOM, newDOM, newDOM.childNodes);
      oldDOM.childNodes[0]?.replaceWith(newDOM.childNodes[0]);
    }
  }
}

export default ShellHTML;
