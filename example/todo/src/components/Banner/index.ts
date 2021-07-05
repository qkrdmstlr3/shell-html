import { createComponent, ShellHTML } from "../../lib/shell-html";
import StyleSheet from "./style.scss";

class Banner extends ShellHTML {
  render() {
    return {
      html: `
      <div class="banner">
        banner
      </div>`,
      css: StyleSheet,
    };
  }
}

createComponent("banner-component", Banner);
