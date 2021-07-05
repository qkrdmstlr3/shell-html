import { createComponent, ShellHTML } from "../../lib/shell-html";
import StyleSheet from "./style.scss";

class Header extends ShellHTML {
  render() {
    return {
      html: `
      <header class="header">
        <h1 class="header__title">Todo List</h1>
      </header>`,
      css: StyleSheet,
    };
  }
}

createComponent("header-component", Header);
