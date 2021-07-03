export function render(ElementName: string, dom: HTMLElement | null): void {
  if (dom) {
    dom.innerHTML = `<${ElementName}/>`;
  }
}

export function createComponent(
  name: string,
  component: CustomElementConstructor
): void {
  customElements.define(name, component);
}
