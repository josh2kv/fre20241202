import { Model } from "./model.js";
import { View } from "./view.js";

// Controller get event from View, and update Model via API
export const Controller = ((model, view) => {
  const state = new model.State();
  const todoContainer = document.querySelector(`.${view.domStr.listContainer}`);
  const inputBox = document.querySelector(`.${view.domStr.inputBox}`);

  const attachDeleteTodoHandler = () => {
    todoContainer.addEventListener("click", async (e) => {
      if (e.target.className !== view.domStr.deleteBtn) return;

      state.todoList = state.todoList.filter(
        (todo) => +todo.id !== +e.target.id
      );
      try {
        await model.deleteTodo(e.target.id);
      } catch (e) {
        alert("Failed to delete todo");
        console.error(e);
      }
    });
  };

  const attachAddTodoHandler = () => {
    inputBox.addEventListener("keypress", async (e) => {
      if (e.key !== "Enter" || inputBox.value.trim() === "") return;

      const newTodo = new model.Todo(inputBox.value);
      try {
        const res = await model.addTodo(newTodo);
        state.todoList = [res, ...state.todoList];
      } catch (e) {
        alert("Failed to add todo");
        console.error(e);
      }

      inputBox.value = "";
    });
  };

  const attachToggleTodoHandler = () => {
    todoContainer.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") return;

      const li = e.target.closest(`.${view.domStr.todoItem}`);
      if (!li) return;

      const todoId = li.querySelector(`.${view.domStr.deleteBtn}`).id;
      const todo = state.todoList.find((todo) => +todo.id === +todoId);
      if (!todo) {
        console.warn(`Todo(${todoId}) not found`);
        return;
      }

      const updatedTodo = { ...todo, completed: !todo.completed };

      try {
        const res = await model.updateTodo(todoId, updatedTodo);
        state.todoList = state.todoList.map((todo) =>
          +todo.id === +todoId ? res : todo
        );
      } catch (e) {
        alert("Failed to update todo");
        console.error(e);
      }
    });
  };

  const init = async () => {
    try {
      const res = await model.getTodos();
      state.todoList = res.reverse();
    } catch (e) {
      alert("Failed to get todos");
      console.error(e);
    }
  };

  const bootstrap = () => {
    init();
    attachDeleteTodoHandler();
    attachAddTodoHandler();
    attachToggleTodoHandler();
  };

  return {
    bootstrap,
  };
})(Model, View);
