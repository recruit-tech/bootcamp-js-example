import store from "../store.js";
import { updateTodoAction, removeTodoAction } from "../flux/index.js";

class Todo {
  #parent;
  #template;
  #props;
  #mounted;

  constructor(parent, { id, name, done }) {
    this.#parent = parent;
    this.#template = document.querySelector("template.todo-item-template");
    this.#props = { id, name, done };
    this.#mounted = false;
    this.element = null;
  }

  render() {
    const next = this.#template.content.firstElementChild.cloneNode(true);
    this.#hydrate(next);
    if (!this.element) {
      this.#parent.appendChild(next);
    } else {
      this.#parent.replaceChild(this.element, next);
    }
    this.element = next;
    this.mount();
  }

  mount() {
    if (this.#mounted) return;
    const toggle = this.element.querySelector(".todo-toggle");
    toggle.addEventListener("click", () => {
      this.#props = { ...this.#props, done: !this.#props.done };
      store.dispatch(updateTodoAction(this.#props));
    });
    const removeButton = this.element.querySelector(".todo-remove-button");
    removeButton.addEventListener("click", () => {
      store.dispatch(removeTodoAction(this.#props));
    });
    this.#mounted = true;
  }

  #hydrate(element) {
    const { id, name, done } = this.#props;

    const toggle = element.querySelector(".todo-toggle");
    toggle.dataset.todoId = id;
    toggle.dataset.todoName = name;
    toggle.value = done ? "checked" : "";
    toggle.checked = done;

    const todoName = element.querySelector(".todo-name");
    todoName.textContent = name;

    const removeButton = element.querySelector(".todo-remove-button");
    removeButton.dataset.id = id;
  }
}

export default Todo;
