import { createStore, createFetchTodoListAction } from './flux/index.js';
import TodoList from './components/todo-list.js';

const store = createStore();

store.subscribe(state => {
  const parent = document.querySelector('.todos__wrapper');
  new TodoList(parent, { todoList: state.todoList }).render();
});

store.dispatch(createFetchTodoListAction());
