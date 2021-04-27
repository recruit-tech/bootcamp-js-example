import store from "../store.js";
import { createAddTodoAction } from "../flux/index.js";

class TodoForm {
  constructor() {
    this.button = document.querySelector(".todo-form__submit");
    this.form = document.querySelector(".todo-form");
  }

  mount() {
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      store.dispatch(createAddTodoAction({ name: this.name.value }));
      this.name.value = "";
      return false;
    });
  }
}

export default TodoForm;
