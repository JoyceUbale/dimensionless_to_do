import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import "../src/App.css";

const App = () => {
    const [todos, setTodos] = useState([]);       // For recommended tasks from the API
    const [userTodos, setUserTodos] = useState([]); // For tasks added by the user

    // Fetch mock data from the dummy API and select 5 random todos
    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/todos');
            console.log("Fetched todos data:", response.data.todos);

            // Shuffle and select 5 random todos from the API response
            const shuffledTodos = response.data.todos.sort(() => 0.5 - Math.random());
            const randomTodos = shuffledTodos.slice(0, 5).map(todo => ({
                id: todo.id,
                task: todo.todo,
                completed: todo.completed
            }));

            setTodos(randomTodos);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = (newTodo) => {
        // Add the new task to userTodos
        setUserTodos([newTodo, ...userTodos]);
    };

    const editTodo = (id, isUserTask = false) => {
        const updatedTask = prompt('Edit your task:');
        if (updatedTask) {
            if (isUserTask) {
                setUserTodos(userTodos.map(todo => 
                    todo.id === id ? { ...todo, task: updatedTask } : todo
                ));
            } else {
                setTodos(todos.map(todo => 
                    todo.id === id ? { ...todo, task: updatedTask } : todo
                ));
            }
        }
    };

    const deleteTodo = (id, isUserTask = false) => {
        if (isUserTask) {
            setUserTodos(userTodos.filter(todo => todo.id !== id));
        } else {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };

    const deleteAllTodos = () => {
        setUserTodos([]);
    };

    const toggleComplete = (id, isUserTask = false) => {
        if (isUserTask) {
            setUserTodos(userTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ));
        } else {
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ));
        }
    };

    return (
        <div className="App">
            <h1>To-Do Reminder</h1>
            <TodoForm addTodo={addTodo} />

            <h2>Your Tasks</h2>
            <TodoList 
                todos={userTodos} 
                editTodo={(id) => editTodo(id, true)} 
                deleteTodo={(id) => deleteTodo(id, true)} 
                toggleComplete={(id) => toggleComplete(id, true)} 
            />

            <h2>Recommended</h2>
            <TodoList 
                todos={todos} 
                editTodo={editTodo} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete} 
            />
            
            <button onClick={deleteAllTodos}>Delete All Your Tasks</button>
        </div>
    );
};

export default App;
