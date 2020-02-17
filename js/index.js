import { createStore } from './flux/index.js';
import TodoList from './components/todo-list.js';

const store = createStore();

store.subscribe(state => {
  const parent = document.querySelector('.todos__wrapper');
  new TodoList(parent, { todos: state.todos }).render();
});

store.run();
