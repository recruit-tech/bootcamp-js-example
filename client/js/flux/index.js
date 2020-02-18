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
export const createFetchTodoListAction = () => ({
  type: FETCH_TODO_ACTION_TYPE,
  paylaod: undefined
});

const ADD_TODO_ACTION_TYPE = 'A todo addition to store';
export const createAddTodoAction = todo => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: todo
});

/**
 * Store Creator
 */
export function createStore() {
  const dispatcher = new Dispatcher();
  const state = {
    todoList: [
      {
        id: 1,
        name: 'sample',
        done: false
      }
    ],
    error: null
  };

  const api = 'http://localhost:3000';

  const dispatch = async ({ type, payload }) => {
    switch (type) {
      case FETCH_TODO_ACTION_TYPE: {
        try {
          const resp = await fetch(`${api}/todo`).then(d => d.json());
          state = { todoList: resp.todoList, error: null };
        } catch (err) {
          state.error = err;
        } finally {
          dispatcher.dispatch();
        }
        break;
      }
      case ADD_TODO_ACTION_TYPE: {
        try {
          const config = { method: 'POST', body: payload };
          const resp = await fetch(`${api}/todo`, config).then(d => d.json());
          state = { todoList: [...state.todoList, resp], error: null };
        } catch (err) {
          state.error = err;
        } finally {
          dispatcher.dispatch();
        }
        break;
      }
    }
  };

  const subscribe = subscriber => {
    dispatcher.subscribe(() => subscriber(state));
  };

  return {
    dispatch,
    subscribe
  };
}
