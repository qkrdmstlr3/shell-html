import { createComponent, ShellHTML } from "../../lib/shell-html";
import StyleSheet from "./style.scss";

class Header extends ShellHTML {
  render() {
    return {
      html: `
      <div class="header">
        header
      </div>`,
      css: StyleSheet,
    };
  }
}

createComponent("header-component", Header);
