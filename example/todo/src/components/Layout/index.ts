import {
  createComponent,
  ShellHTML,
  useGlobalState,
} from "../../lib/shell-html";
import StyleSheet from "./style.scss";
import { EventType } from "../../lib/shell-html/type";

class Layout extends ShellHTML {
  constructor() {
    super("developer");
  }

  connectedCallback() {
    this.enrollObserving("page");
  }

  disconnectedCallback() {
    this.releaseObserving("page");
  }

  changeIntroduceHandler() {
    if (this.state === "developer") {
      this.setState("welcome");
      return;
    }
    this.setState("developer");
  }

  render() {
    const page = useGlobalState("page");
    const introduce =
      this.state === "developer" ? "made by shellboy" : "welcome!";

    return {
      html: `
      <div class="layout">
        <span>${introduce} <span class="layout__click">click!</span></span>
        <header-component id="header"></header-component>
        ${
          page === "home"
            ? '<banner-component id="banner"></banner-component>'
            : '<todolist-component id="todo"></todolist-component>'
        }
      </div>`,
      css: StyleSheet,
      eventFuncs: [
        {
          className: "layout__click",
          func: this.changeIntroduceHandler,
          type: EventType.click,
        },
      ],
    };
  }
}

createComponent("layout-component", Layout);
