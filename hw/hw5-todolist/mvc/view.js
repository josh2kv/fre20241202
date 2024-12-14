// View can only access DOM, and can't access Model
export const View = (() => {
  // DOM string constants for element selectors
  const domStr = {
    inputBox: "todoList-input",
    listContainer: "todoList-container",
    deleteBtn: "delete-btn",
    todoItem: "todo-item",
  };

  // Generates HTML template string from todo array
  const createTmp = (todoArr) => {
    let tmp = "";
    todoArr.forEach((todo) => {
      tmp += `
        <li class="${domStr.todoItem} ${todo.completed ? "completed" : ""}">
          <span>${todo.id}-${todo.title}</span>
          <button class="${domStr.deleteBtn}" id="${todo.id}">X</button>
        </li>`;
    });
    return tmp;
  };

  // Updates DOM element with provided HTML template
  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  return {
    domStr,
    createTmp,
    render,
  };
})();
