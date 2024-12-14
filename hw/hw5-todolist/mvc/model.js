import { API } from "./api.js";
import { View } from "./view.js";

// Model class that manages the state of the todo list
// Model can access View
export const Model = ((api, view) => {
  class State {
    #todoList = [];
    #todoContainer = document.querySelector(`.${view.domStr.listContainer}`);

    // Gets the current todo list
    get todoList() {
      return this.#todoList;
    }

    // Updates the todo list and re-renders the view
    set todoList(newTodoList) {
      this.#todoList = newTodoList;

      const tmp = view.createTmp(this.#todoList);
      view.render(this.#todoContainer, tmp);
    }
  }

  class Todo {
    constructor(title) {
      this.userId = 22;
      this.title = title;
      this.completed = false;
    }
  }

  return {
    ...api,
    State,
    Todo,
  };
})(API, View);
