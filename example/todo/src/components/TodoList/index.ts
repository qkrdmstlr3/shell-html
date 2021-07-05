import { createComponent, ShellHTML } from "../../lib/shell-html";
import StyleSheet from "./style.scss";

class TodoList extends ShellHTML {
  render() {
    return {
      html: `
      <div class="todolist">
        todolist
      </div>`,
      css: StyleSheet,
    };
  }
}

createComponent("todolist-component", TodoList);
