import { createFetchTodoListAction } from "./flux/index.js";
import store from "./store.js";
import TodoList from "./components/todo-list.js";
import TodoForm from "./components/todo-form.js";

store.subscribe(state => {
  const parent = document.querySelector(".todo-list__wrapper");
  new TodoList(parent, { todoList: state.todoList }).render();
  new TodoForm().mount();
});

store.dispatch(createFetchTodoListAction());
