import {
  createComponent,
  ShellHTML,
  useGlobalState,
  setGlobalState,
  EventType,
} from "../../lib/shell-html";
import StyleSheet from "./style.scss";

interface TodoItem {
  id: number;
  content: string;
}

class Banner extends ShellHTML {
  movePageToListHandler() {
    setGlobalState("page", "todolist");
  }

  createNewTodoItemHandler(event: Event) {
    event.preventDefault();

    const list: TodoItem[] = useGlobalState("todolist");
    const input = this.querySelector("input") as HTMLInputElement;

    setGlobalState("todolist", [
      ...list,
      {
        id: list.length ? list[list.length - 1].id + 1 : 1,
        content: input.value,
      },
    ]);
    input.value = "";
  }

  render() {
    return {
      html: `
      <main class="banner">
        <form class="banner__todobox">
          <input placeholder="input todo item" class="banner__todobox__input" />
          <button class="banner__todobox__button">enroll</button>
        </form>
        <a class="banner__link">move to list</a>
      </main>`,
      css: StyleSheet,
      eventFuncs: [
        {
          className: "banner__link",
          func: this.movePageToListHandler,
          type: EventType.click,
        },
        {
          className: "banner__todobox",
          func: this.createNewTodoItemHandler,
          type: EventType.submit,
        },
      ],
    };
  }
}

createComponent("banner-component", Banner);
