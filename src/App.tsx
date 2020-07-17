import React, { useReducer } from "react";

import TodoList, { TodoListItem } from "./TodoList";

const reducer = (
  state: TodoListItem[],
  {
    type,
    id,
    text
  }: {
    type: "add" | "delete" | "update";
    id?: number;
    text?: string;
  }
): TodoListItem[] => {
  switch (type) {
    case "add":
      return [...state, { name: text || "New list" }];
    case "update":
      return state.map((item, position) => {
        if (position === id) {
          return {
            ...item,
            name: text || ""
          };
        }

        return item;
      });
    case "delete":
      if (id == null) {
        return state;
      }
      return state.filter((_item, position) => position !== id);
  }
};

export default function App() {
  const [lists, dispatch] = useReducer(reducer, []);

  return (
    <div className="App">
      <header>
        <button
          onClick={() => {
            dispatch({ type: "add" });
          }}
        >
          new list
        </button>
      </header>
      <div className="todolist-container">
        {lists.map((item, id) => (
          <TodoList
            todolist={item}
            onNameChange={name => dispatch({ type: "update", id, text: name })}
          />
        ))}
      </div>
    </div>
  );
}
