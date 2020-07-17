import React, { useState, useRef, useEffect } from "react";

export interface TodoItem {
  done: boolean;
  text: string;
}

export interface TodoProps {
  todo: TodoItem;
  onDelete?: () => void;
  onValueChange?: (text: string) => void;
}

export default function Todo({
  todo,
  onDelete = () => {},
  onValueChange = () => {}
}: TodoProps) {
  const [done, setDone] = useState(todo.done);
  const [editable, setEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputText.current == null) {
      return;
    }

    inputText.current.focus();
  }, [editable]);

  return (
    <>
      <div className="Todo">
        <input
          type="checkbox"
          checked={done}
          onChange={event => setDone(event.target.checked)}
        />
        {!editable && <p onClick={() => setEditable(true)}>{todo.text}</p>}
        {editable && (
          <input
            type="text"
            ref={inputText}
            value={todo.text}
            placeholder="Todo text"
            onBlur={() => setEditable(false)}
            onChange={event => onValueChange(event.target.value)}
          />
        )}
        <button onClick={() => setShowModal(true)}>update</button>
        <button onClick={() => onDelete()}>delete</button>
      </div>
      {showModal && (
        <div className="modal-background" onClick={() => setShowModal(false)}>
          <div className="modal">
            <form>
              <input
                type="text"
                value={todo.text}
                onChange={event => onValueChange(event.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
