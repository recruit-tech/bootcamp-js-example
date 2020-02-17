/**
 * Dispatcher
 */
class Dispatcher extends EventTarget {
  dispatch() {
    this.dispatchEvent(new CustomEvent('event'));
  }

  subscribe(subscriber) {
    this.addEventListener('event', subscriber);
  }
}

/**
 * Action Creator and Action Types
 */
const FETCH_TODO_ACTION_TYPE = 'Fetch todo list from server';
export const fetchTodoListAction = () => ({
  type: FETCH_TODO_ACTION_TYPE,
  paylaod: undefined
});

const ADD_TODO_ACTION_TYPE = 'A todo addition to store';
export const addTodoAction = todo => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: todo
});

/**
 * Store Creator
 */
export function createStore() {
  const dispatcher = new Dispatcher();
  const state = {
    todos: [
      {
        id: 1,
        name: 'sample',
        done: false
      }
    ]
  };

  const dispatch = ({ type, payload }) => {
    if (type === actionTypes.ADD_TODO) {
      state.todos = [...state.todos, payload];
      dispatcher.dispatch();
    }
  };

  const subscribe = subscriber => {
    dispatcher.subscribe(() => subscriber(state));
  };

  const run = () => {
    dispatcher.dispatch();
  };

  return {
    dispatch,
    subscribe,
    run
  };
}
