import { createStore } from './flux/index.js';
import Todo from './components/todo.js';

const store = createStore();

store.subscribe(state => {
  state.todos.map(todo => new Todo(todo).render());
});

store.run();
