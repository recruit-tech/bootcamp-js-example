import store from "../store.js";
import { updateTodoAction, removeTodoAction } from "../flux/index.js";

class Todo {
  constructor(parent, { id, name, done }) {
    this.parent = parent;
    this.props = { id, name, done };
    this.mounted = false;
  }

  mount() {
    if (this.mounted) return;
    const toggle = this.element.querySelector(".todo-toggle");
    toggle.addEventListener("click", () => {
      this.props = { ...this.props, done: !this.props.done };
      store.dispatch(updateTodoAction(this.props));
    });
    const removeButton = this.element.querySelector(".todo-remove-button");
    removeButton.addEventListener("click", () => {
      store.dispatch(removeTodoAction(this.props));
    });
    this.mounted = true;
  }

  render() {
    const { id, name, done } = this.props;
    const next = document.createElement("li")
    next.className = "todo-item";
    next.innerHTML = `
      <label class="todo-toggle__container">
        <input
          data-todo-id="${id}"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          ${done ? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name">${name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;
    if (!this.element) {
      this.parent.appendChild(next)
    } else {
      this.parent.replaceChild(this.element, next);
    }
    this.element = next
    this.mount();
  }
}

export default Todo;
