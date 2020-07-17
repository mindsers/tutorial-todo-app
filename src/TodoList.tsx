import React, { useState, useReducer } from "react";
import "./styles.css";

import Todo, { TodoItem } from "./Todo";

export interface TodoListItem {
  name: string;
}

export interface TodoListProps {
  todolist: TodoListItem;
  onNameChange?: (name: string) => void;
}

const reducer = (
  state: TodoItem[],
  {
    type,
    text,
    id
  }: {
    type: "add" | "delete" | "update" | "delete-all";
    id?: number;
    text?: string;
  }
): TodoItem[] => {
  switch (type) {
    case "add":
      return [...state, { done: false, text: text || "" }];
    case "update":
      return state.map((item, position) => {
        if (position === id) {
          return {
            ...item,
            text: text || ""
          };
        }

        return item;
      });
    case "delete":
      if (id == null) {
        return state;
      }
      return state.filter((_item, position) => position !== id);
    case "delete-all":
      return [];
  }
};

export default function TodoList({
  todolist: { name },
  onNameChange = () => {}
}: TodoListProps) {
  const [text, setText] = useState("");
  const [todolist, dispatch] = useReducer(reducer, []);
  const [editable, setEditable] = useState(false);

  return (
    <div className="TodoList">
      <header>
        {!editable && <h1>{name}</h1>}
        {editable && (
          <input
            type="text"
            value={name}
            placeholder="Todolist name"
            onBlur={() => setEditable(false)}
            onChange={event => onNameChange(event.target.value)}
          />
        )}
        <button onClick={() => setEditable(true)}>rename</button>
        <button onClick={() => dispatch({ type: "delete-all" })}>
          delete all
        </button>
      </header>
      <div>
        {todolist.length < 1 && (
          <p className="fallback-message">No todo items</p>
        )}
        {todolist.map((item, id) => (
          <Todo
            todo={item}
            onValueChange={value =>
              dispatch({ type: "update", id, text: value })
            }
            onDelete={() => dispatch({ type: "delete", id })}
          />
        ))}
      </div>
      <form
        onSubmit={event => {
          event.preventDefault();
          const textValue = text.trim();

          if (textValue.length < 1) {
            return;
          }

          dispatch({ type: "add", text: textValue });
          setText("");
        }}
      >
        <input
          type="text"
          value={text}
          placeholder="Add a todo"
          onChange={event => setText(event.target.value)}
        />
      </form>
    </div>
  );
}
