import {
  createComponent,
  ShellHTML,
  useGlobalState,
} from "../../lib/shell-html";
import StyleSheet from "./style.scss";

class Layout extends ShellHTML {
  connectedCallback() {
    this.enrollObserving("page");
  }

  disconnectedCallback() {
    this.releaseObserving("page");
  }

  render() {
    const page = useGlobalState("page");

    return {
      html: `
      <div class="layout">
        <header-component id="header"></header-component>
        ${
          page === "home"
            ? '<banner-component id="banner"></banner-component>'
            : '<todolist-component id="todo"></todolist-component>'
        }
      </div>`,
      css: StyleSheet,
    };
  }
}

createComponent("layout-component", Layout);
