import {
  createComponent,
  ShellHTML,
  useGlobalState,
} from "../../lib/shell-html";
import StyleSheet from "./style.scss";
import { EventType } from "../../lib/shell-html/type";

class Layout extends ShellHTML {
  /** you can init component state using super() */
  constructor() {
    super("developer");
  }

  connectedCallback() {
    /** you have to enroll globalstate to rerendering if globalstate changed */
    this.enrollObserving("page");
  }

  disconnectedCallback() {
    /** you have to release globalstate to rerendering for garbase collector */
    this.releaseObserving("page");
  }

  changeIntroduceHandler() {
    /** you can change component state using this.setState(). after changed component rerendered */
    if (this.state === "developer") {
      this.setState("welcome");
      return;
    }
    this.setState("developer");
  }

  render() {
    /** you can use globalstate using useGlobalState */
    const page = useGlobalState("page");
    /** this.state can get component state  */
    const introduce =
      this.state === "developer" ? "made by shellboy" : "welcome!";

    /** If you want to use other component, you have to assign id to component */
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
