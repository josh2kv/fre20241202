import { Model } from "./model.js";
import { View } from "./view.js";

// Controller get event from View, and update Model via API
export const Controller = ((model, view) => {
  const state = new model.State();
  const todoContainer = document.querySelector(`.${view.domStr.listContainer}`);
  const inputBox = document.querySelector(`.${view.domStr.inputBox}`);

  const attachDeleteTodoHandler = () => {
    todoContainer.addEventListener("click", (e) => {
      if (e.target.className !== view.domStr.deleteBtn) return;

      state.todoList = state.todoList.filter(
        (todo) => +todo.id !== +e.target.id
      );
      model.deleteTodo(e.target.id);
    });
  };

  const attachAddTodoHandler = () => {
    inputBox.addEventListener("keypress", (e) => {
      if (e.key !== "Enter" || inputBox.value.trim() === "") return;

      const newTodo = new model.Todo(inputBox.value);
      model.addTodo(newTodo).then((res) => {
        state.todoList = [res, ...state.todoList];
      });

      inputBox.value = "";
    });
  };

  const init = () => {
    model.getTodos().then((res) => {
      state.todoList = res.reverse();
    });
  };

  const bootstrap = () => {
    init();
    attachDeleteTodoHandler();
    attachAddTodoHandler();
  };

  return {
    bootstrap,
  };
})(Model, View);
