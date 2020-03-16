import Todo from "./todo.js";

class TodoList {
  constructor(parent, { todoList }) {
    this.parent = parent;
    this.element = document.createElement("ul");
    this.element.className = "todo-list";
    this.props = { todoList };
  }

  render() {
    if (this.parent.children.length !== 0) {
      this.parent.removeChild(this.parent.children);
    }
    this.props.todoList.map(todo => {
      new Todo(this.element, todo).render();
    });
    this.parent.appendChild(this.element);
  }
}

export default TodoList;
