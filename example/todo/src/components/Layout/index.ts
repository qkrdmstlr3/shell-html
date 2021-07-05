import { createComponent, ShellHTML } from "../../lib/shell-html";
import StyleSheet from "./style.scss";

class Layout extends ShellHTML {
  render() {
    return {
      html: `
      <div class="layout">
        <header-component id="header"></header-component>
        <todolist-component id="todo"></todolist-component>
      </div>`,
      css: StyleSheet,
    };
  }
}

createComponent("layout-component", Layout);
