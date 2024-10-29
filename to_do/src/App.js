import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';

const App = () => {
    const [todos, setTodos] = useState([]);

    // Fetch mock data from the dummy API
    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/todos');
            console.log("Fetched todos data:", response.data.todos);  // Check structure here
            const mappedTodos = response.data.todos.map(todo => ({
                id: todo.id,
                task: todo.todo, // ensure this matches the property name from API response
                completed: todo.completed
            }));
            setTodos(mappedTodos);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const editTodo = (id) => {
        const updatedTask = prompt('Edit your task:');
        if (updatedTask) {
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, task: updatedTask } : todo
            ));
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const deleteAllTodos = () => {
        setTodos([]);
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div>
            <h1>To-Do Reminder</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList 
                todos={todos} 
                editTodo={editTodo} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete} 
            />
            <button onClick={deleteAllTodos}>Delete All</button>
        </div>
    );
};

export default App;