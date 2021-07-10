# shell-html

![version](https://img.shields.io/npm/v/shell-html)
![dependencies](https://img.shields.io/badge/dependencies-none-success)
![typescript](https://img.shields.io/badge/typescript-4.3.5-blue?logo=typescript)

> simple library for component-based front-end development using scss

shell-html is a simple library implemented with about 300 lines using vanillaTS. It enables component-based development using web-component and shadowDOM. You can styling using with **SCSS**

### Install

```
npm install shell-html
```

## Examples

providing an **[example project](https://github.com/qkrdmstlr3/shell-html/tree/main/example/todo)** to show you how it works.

## Docs

explained based on TypeScript. If you want to use Javascript, you can remove type declaration

<a href="#create">create component</a>

<a href="#use">how to render component</a>

<a href="#methods">shell-html methods</a>

<a href="#localstate">manage component local state</a>

<a href="#globalstate">manage component global state</a>

---

### <div id="create">Create Component</div>

To create component, you need to import **ShellHTML** and **createComponent**.
Create a new class that extends shellhtml. You can render html tags inside render function returning below. To render component, you have to use createComponent. First argument is component name and second is Class.

🟥 **Note** that the component name must contain `-`

```typescript
// firstComponent.ts
import { ShellHTML, createComponent } from "shell-html";

class FirstComponent extends ShellHTML {
  render() {
    return {
      html: `<div class="className"></div>`,
    };
  }
}

createComponent("first-component", FirstComponent);
```

<br/>

If you want to add a stylesheet to a component or register for an event, you can do something like this:

```typescript
// firstComponent.ts
import { ShellHTML, createComponent, EventType } from "shell-html";
import styleSheet from "./style.scss";

class FirstComponent extends ShellHTML {
  clickHandler() {
    console.log("clicked!");
  }

  render() {
    return {
      html: `<div class="className"></div>`,
      css: styleSheet,
      eventFuncs: [
        {
          className: "className",
          func: this.clickHandler,
          type: EventType.click,
        },
      ],
    };
  }
}

createComponent("first-component", FirstComponent);
```

🟥 There are caveats when using stylesheet. The shell-html component is protected using **shadowDOM**. This means that direct access to the component from outside is not possible. Therefore, it is not affected by css declared outside the component. This makes it possible to use duplicate ids for different components, and saves you from worrying about naming classes so that they do not overlap.

Using with scss, you can remove duplicate style

---

### <div id="use">How to render Component</div>

Look at how to render the created component to DOM. Rendering can be done in two ways. First, render the entry component to html (for example Layout). second is rendering a component from a component

First way is very simple. you need `index.html` for rendering. and create one tag with id.

```html
<body>
  <div id="root"></div>
</body>
```

Doesn't it seem like a form you've seen a lot somewhere? right. These tags are mainly used when developing SPA in react. To put a component under the #id tag, you must declare below code as follows in the entry file.

The render function allows the component of the first argument to be rendered to the tag of the second argument.

```typescript
// index.ts (entry file)
import { render } from "shell-html";

render("first-component", document.getElementById("root"));
```

<br/>

Let's look at the code first to explain the second method.

```typescript
// secondComponent.ts
import { ShellHTML, createComponent } from "shell-html";

class LayoutComponent extends ShellHTML {
  render() {
    return {
      html: `
        <div>
          <first-component id="first"></first-component>
          <second-component id="second"></second-component>
        </div>
        `,
    };
  }
}

createComponent("layout-component", LayoutComponent);
```

Don't you feel it how to use it? Just use the declared tag!

🟥 Note that you have to specify the id. Because shell-html uses an existing component instead of creating a new component by comparing the ID, you must give it an ID. The id value must not be duplicated within one component

---

### <div id="methods">shell-html methods</div>

shell-html is custom-element based. So shell-html supports two functions in custom-element.

It were **connectedCallback** and **disconnectedCallback**. connectedCallback function called when component is attatched to DOM. You can enroll something in this function. disconnectedCallback function called when component is removed from DOM. You can release something in this function.

🟥If you enroll something but not release that, it can lead to memory leaks

```typescript
import { ShellHTML, createComponent, EventType } from "shell-html";
import styleSheet from "./style.scss";

class FirstComponent extends ShellHTML {
  connectedCallback() {
    // executed when component attatch to DOM
  }

  disconnectedCallback() {
    // executed when component remove from DOM
  }

  render() {
    return {
      ...
    };
  }
}

createComponent("first-component", FirstComponent);
```

shell-html also provide getElementsById and querySelector like below code:

```typescript
import { ShellHTML, createComponent, EventType } from "shell-html";
import styleSheet from "./style.scss";

class FirstComponent extends ShellHTML {
  clickHandler() {
    const element1 = this.getElementById("id")
    const element2 = this.querySelector("tag")
  }

  render() {
    return {
      ...
    };
  }
}

createComponent("first-component", FirstComponent);
```

---

### <div id="localstate">manage component local state</div>

shell-html supports **state** inside components. you can init initial value by passing an argument to the super function of the constructor. State is accessible via `this.state`. And you can change the state through `this.setState` function. When the state changes, the component is re-rendered. (
state guarantees immutability)

```typescript
// firstComponent.ts
import { ShellHTML, createComponent, EventType } from "shell-html";
import styleSheet from "./style.scss";

class FirstComponent extends ShellHTML {
  constructor() {
    // init initial state
    super("hello");
  }

  clickHandler() {
    // change state
    this.setState("world");
  }

  render() {
    // use state
    const value = this.state;

    return {
      html: `<div class="className">${value}</div>`,
      css: styleSheet,
      eventFuncs: [
        {
          className: "className",
          func: this.clickHandler,
          type: EventType.click,
        },
      ],
    };
  }
}

createComponent("first-component", FirstComponent);
```

---

### <div id="globalstate">manage component global state</div>

shell-html's component has a big disadvantage which is it cannot send and receive props like react. So it supports its own global state management.

To use global state you have to declare global state to entry file. You need to pass an object to the state function. The key value of an object must be unique and is an identifier that distinguishes the global state. init value is an initialization value

```typescript
// index.ts(entry file)
import { state } from "shell-html";

state({
  key: "state",
  init: { name: "hello" },
});
```

The shell html provides two functions for handling global state. The useglobalstate function is a function to get the global state value. If you pass the key value of the global state you want to get, the state is returned. setglobalstate changes the value of the global state. Additionally, you only need to pass the value to be changed as the second argument.

```typescript
// firstComponent.ts
import {
  ShellHTML,
  createComponent,
  EventType,
  useGlobalState,
  getGlobalState,
} from "shell-html";
import styleSheet from "./style.scss";

class FirstComponent extends ShellHTML {
  clickHandler() {
    // change state
    setGlobalState("state", { name: "world" });
  }

  render() {
    // use state
    const value = useGlobalState("state");

    return {
      html: `<div class="className">${value}</div>`,
      css: styleSheet,
      eventFuncs: [
        {
          className: "className",
          func: this.clickHandler,
          type: EventType.click,
        },
      ],
    };
  }
}

createComponent("first-component", FirstComponent);
```

However, in order for the component to be re-rendered when the globalstate is changed, one additional operation must be performed. You can start and disable global state monitoring through enrollObserving and releaseObserving. Just need to pass the key name

🟥 If you use enrollObserving function, you have to use releaseObserving too. If you don't, memory leaks occur.

```typescript
import {
  ShellHTML,
  createComponent,
  EventType,
  useGlobalState,
  getGlobalState,
} from "shell-html";
import styleSheet from "./style.scss";

class FirstComponent extends ShellHTML {
  connectedCallback() {
    // enroll
    this.enrollObserving("state");
  }

  disconnectedCallback() {
    // release
    this.releaseObserving("state");
  }

  clickHandler() {
    setGlobalState("state", { name: "world" });
  }

  render() {
    const value = useGlobalState("state");

    return {
      html: `<div class="className">${value}</div>`,
      css: styleSheet,
      eventFuncs: [
        {
          className: "className",
          func: this.clickHandler,
          type: EventType.click,
        },
      ],
    };
  }
}

createComponent("first-component", FirstComponent);
```
