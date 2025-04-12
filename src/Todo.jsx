import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

export default function Todo() {
    const [todos, setTodos] = useState([{ task: "Eat", id: uuidv4(), done: false }]);
    const [newTodo, setNewTodo] = useState("");

    const updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    const addNewTask = () => {
        if (newTodo.trim() === "") {
            alert("Please write something");
        } else {
            setTodos((prevTodos) => [
                ...prevTodos,
                { task: newTodo, id: uuidv4(), done: false },
            ]);
            setNewTodo("");
        }
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const DoneTodoTask = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <div className="wrapper">
            <h1 className="heading">Just do it.</h1>

            <div className="Todo">
                <div className="input_value">
                    <input
                        type="text"
                        name="task"
                        id="task"
                        value={newTodo}
                        placeholder="Add a task."
                        onChange={updateTodoValue}
                    />
                    <button onClick={addNewTask}>I Got This!</button>
                </div>

                <div className="date">
                    {new Date().toLocaleString()}
                </div>

                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className="todo-item-wrapper">
                            <span className={todo.done ? "todo-text done" : "todo-text"}>
                                {todo.task}
                            </span>
                            <div className="icon-actions">
                                <i
                                    onClick={() => DoneTodoTask(todo.id)}
                                    className="fa-solid fa-check check-icon"
                                ></i>
                                <i
                                    onClick={() => deleteTodo(todo.id)}
                                    className="fa-solid fa-trash delete-icon"
                                ></i>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
