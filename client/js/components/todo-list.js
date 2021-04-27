import Todo from "./todo.js";

class TodoList {
  #parent;
  #props;

  constructor(parent, { todoList }) {
    this.#parent = parent;
    this.#props = { todoList };
    this.element = document.createElement("ul");
    this.element.className = "todo-list";
  }

  render() {
    const children = this.#props.todoList.map((todo) => {
      const component = new Todo(this.element, todo);
      component.render();
      return component;
    });

    if (this.#parent.children.length === 0) {
      this.#parent.appendChild(this.element);
    } else {
      this.#parent.replaceChildren(...children.map((c) => c.element));
    }
  }
}

export default TodoList;
