import { createFetchTodoListAction, clearError } from "./flux/index.js";
import store from "./store.js";
import TodoList from "./components/todo-list.js";
import TodoForm from "./components/todo-form.js";

new TodoForm().mount();

const handleError = (err) => {
  console.error(err);
  alert(err);
  store.dispatch(clearError());
}

store.subscribe((state) => {
  if (state.error) return handleError(state.error)
  const parent = document.querySelector(".todo-list__wrapper");
  new TodoList(parent, { todoList: state.todoList }).render();
});

store.dispatch(createFetchTodoListAction());
