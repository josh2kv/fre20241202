export const API = (() => {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  // const baseUrl = "http://localhost:4232";
  const todoPath = "todos";

  const getTodos = () =>
    fetch([baseUrl, todoPath].join("/")).then((response) => response.json());

  const addTodo = (newTodo) =>
    fetch([baseUrl, todoPath].join("/"), {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, todoPath, id].join("/"), {
      method: "DELETE",
    });

  // It gets 500 response when using newly added todo `id`.
  // So it needs to use PATCH method to update `completed` field.
  const updateTodo = (id, newTodo) =>
    fetch([baseUrl, todoPath, id].join("/"), {
      method: "PUT",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

  const toggleTodo = (id, completed) =>
    fetch([baseUrl, todoPath, id].join("/"), {
      method: "PATCH",
      body: JSON.stringify({ completed }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

  return {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo,
    toggleTodo,
  };
})();
