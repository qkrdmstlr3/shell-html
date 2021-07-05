import {
  createComponent,
  ShellHTML,
  setGlobalState,
  EventType,
} from "../../lib/shell-html";
import StyleSheet from "./style.scss";

class Banner extends ShellHTML {
  movePageToListHandler() {
    setGlobalState("page", "todolist");
  }

  render() {
    return {
      html: `
      <main class="banner">
        <div class="banner__todobox">
          <input placeholder="input todo item" class="banner__todobox__input" />
          <button class="banner__todobox__button">enroll</button>
        </div>
        <a class="banner__link">move to list</a>
      </main>`,
      css: StyleSheet,
      eventFuncs: [
        {
          className: "banner__link",
          func: this.movePageToListHandler,
          type: EventType.click,
        },
      ],
    };
  }
}

createComponent("banner-component", Banner);
