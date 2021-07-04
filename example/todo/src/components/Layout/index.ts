import { createComponent, ShellHTML } from "../../lib/shell-html";

class Layout extends ShellHTML {
  render() {
    return {
      html: `<div>helloworld</div>`,
    };
  }
}

createComponent("layout-component", Layout);
