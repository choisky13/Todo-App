import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <div className="container">
      <h1>🍀 최스카이 투두리스트 🍀</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="input-group">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState(todo.content);
  const [isEditing, setEditing] = useState(false);

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.isDone || false}
        onChange={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, isDone: !el.isDone } : el,
            ),
          );
        }}
      />

      {isEditing ? (
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      ) : (
        <span className={`todo-text ${todo.isDone ? "done" : ""}`}>
          {todo.content}
        </span>
      )}

      <button
        onClick={() => {
          if (isEditing) {
            setTodoList((prev) =>
              prev.map((el) =>
                el.id === todo.id ? { ...el, content: inputValue } : el,
              ),
            );
          }
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "저장" : "수정"}
      </button>

      <button
        onClick={() => {
          setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
