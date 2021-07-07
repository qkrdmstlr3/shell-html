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

class TodoList extends ShellHTML {
  connectedCallback() {
    /** you have to enroll globalstate to rerendering if globalstate changed */
    this.enrollObserving("todolist");
  }

  disconnectedCallback() {
    /** you have to release globalstate to rerendering for garbase collector */
    this.releaseObserving("todolist");
  }

  movePageToHomeHandler() {
    /** you can change globalstate using setGlobalstate. In that time, all components enrolled globalstate occur rerendering */
    setGlobalState("page", "home");
  }

  removeTodoItemHandler(event: Event) {
    if (!(event.target instanceof HTMLElement)) return;

    const id = event.target.id;
    if (!id) return;

    /** you can use globalstate using useGlobalState */
    const list: TodoItem[] = useGlobalState("todolist");
    const newTodoList = list.filter((item) => item.id !== Number(id));
    setGlobalState("todolist", newTodoList);
  }

  getTodoListHTML() {
    const list: TodoItem[] = useGlobalState("todolist");
    return list.reduce(
      (acc, item) =>
        (acc += `
        <li class="todolist__item">
          <p>${item.id}. ${item.content}</p>
          <button id="${item.id}" class="todolist__item-button">delete</button>
        </li>
        `),
      ""
    );
  }

  render() {
    const todoListHTML = this.getTodoListHTML();

    return {
      html: `
      <div class="todolist">
        <a class="todolist__link">back to home</a>
        <ul class="todolist__list">${todoListHTML}</ul>
      </div>`,
      css: StyleSheet,
      eventFuncs: [
        {
          className: "todolist__link",
          func: this.movePageToHomeHandler,
          type: EventType.click,
        },
        {
          className: "todolist__item-button",
          func: this.removeTodoItemHandler,
          type: EventType.click,
        },
      ],
    };
  }
}

createComponent("todolist-component", TodoList);
