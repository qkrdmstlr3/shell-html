/**
 * entry file
 * call global state and components
 * render layout component to root tag
 */
// Dependencies
import { render } from "./lib/shell-html";
import "./state";

// Components
import "./components/Layout";
import "./components/Banner";
import "./components/Header";
import "./components/TodoList";

render("layout-component", document.getElementById("root"));
