import { createFetchTodoListAction, clearError } from "./flux/index.js";
import store from "./store.js";
import TodoList from "./components/todo-list.js";
import TodoForm from "./components/todo-form.js";

new TodoForm().mount();

store.subscribe(state => {
  if (state.error === null) {
    const parent = document.querySelector(".todo-list__wrapper");
    new TodoList(parent, { todoList: state.todoList }).render();
  } else {
    alert(state.error.message);
    store.dispatch(clearError());
  }
});

store.dispatch(createFetchTodoListAction());
