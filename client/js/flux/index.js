/**
 * Dispatcher
 */
class Dispatcher extends EventTarget {
  dispatch() {
    this.dispatchEvent(new CustomEvent("event"));
  }

  subscribe(subscriber) {
    this.addEventListener("event", subscriber);
  }
}

/**
 * Action Creator and Action Types
 */
const FETCH_TODO_ACTION_TYPE = "Fetch todo list from server";
export const createFetchTodoListAction = () => ({
  type: FETCH_TODO_ACTION_TYPE,
  paylaod: undefined
});

const ADD_TODO_ACTION_TYPE = "A todo addition to store";
export const createAddTodoAction = todo => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: todo
});

const UPDATE_TODO_ACTION_TYPE = "Update todo state";
export const updateTodoAction = todo => ({
  type: UPDATE_TODO_ACTION_TYPE,
  payload: todo
});

const REMOVE_TODO_ACTION_TYPE = "Remove todo";
export const removeTodoAction = todo => ({
  type: REMOVE_TODO_ACTION_TYPE,
  payload: todo
});

const CLEAR_ERROR = "Clear error from state";
export const clearError = () => ({
  type: CLEAR_ERROR,
  payload: undefined
});

/**
 * Store Creator
 */
const api = "http://localhost:3000/todo";

const defaultState = {
  todoList: [],
  error: null
};

const headers = {
  "Content-Type": "application/json; charset=utf-8"
};

const reducer = async (prevState, { type, payload }) => {
  switch (type) {
    case FETCH_TODO_ACTION_TYPE: {
      try {
        const resp = await fetch(api).then(d => d.json());
        return { todoList: resp.todoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case UPDATE_TODO_ACTION_TYPE: {
      const { id, ...body } = payload;
      try {
        const resp = await fetch(`${api}/${id}`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(body)
        }).then(d => d.json());
        const idx = prevState.todoList.findIndex(todo => todo.id === resp.id);
        if (idx === -1) return prevState;
        const nextTodoList = prevState.todoList.concat();
        nextTodoList[idx] = resp;
        return { todoList: nextTodoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case REMOVE_TODO_ACTION_TYPE: {
      const { id } = payload;
      try {
        await fetch(`${api}/${id}`, {
          method: "DELETE",
          mode: "cors"
        });
        const idx = prevState.todoList.findIndex(todo => todo.id == id);
        if (idx === -1) return prevState;
        const nextTodoList = prevState.todoList.concat();
        nextTodoList.splice(idx, 1);
        return { todoList: nextTodoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case ADD_TODO_ACTION_TYPE: {
      const body = JSON.stringify(payload);
      const config = { method: "POST", body, headers };
      try {
        const resp = await fetch(api, config).then(d => d.json());
        return { todoList: [...prevState.todoList, resp], error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case CLEAR_ERROR: {
      return { ...prevState, error: null };
    }
    default: {
      throw new Error("unexpected action type: %o", { type, payload });
    }
  }
};

export function createStore(initialState = defaultState) {
  const dispatcher = new Dispatcher();
  let state = initialState;

  const dispatch = async ({ type, payload }) => {
    console.group(type);
    console.log("prev", state);
    state = await reducer(state, { type, payload });
    console.log("next", state);
    console.groupEnd();
    dispatcher.dispatch();
  };

  const subscribe = subscriber => {
    dispatcher.subscribe(() => subscriber(state));
  };

  return {
    dispatch,
    subscribe
  };
}
