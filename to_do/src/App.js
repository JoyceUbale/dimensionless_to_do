import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './Components/TodoForm';
import TodoList from'./Components/TodoList';
import nightModeIcon from '../src/assets/night-mode.png';
import sunIcon from '../src/assets/sun.png';
import "../src/App.css";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [userTodos, setUserTodos] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchTodos();
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/todos');
            const randomTodos = response.data.todos.slice(0, 5).map(todo => ({
                id: todo.id,
                task: todo.todo,
                completed: todo.completed,
                dueDate: ''
            }));
            setTodos(randomTodos);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = (newTodo) => {
        setUserTodos(prev => [newTodo, ...prev].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
    };

    // Example updateTodo function in App.js
    const updateTodo = (id, newTask, newDueDate) => {
        setUserTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, task: newTask, dueDate: newDueDate } : todo
            )
        );
    };
    

    const updateRecommendedTodo = (id, newTask, newDueDate) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, task: newTask, dueDate: newDueDate } : todo
            )
        );
    };

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="App">
            <button className="toggle-theme-btn" onClick={toggleTheme}>
                <img src={darkMode ? sunIcon : nightModeIcon} alt="Toggle Theme" style={{ width: '24px', height: '24px' }} />
            </button>
            <div className='h1t'>Tick Karo</div>
            <TodoForm 
                addTodo={addTodo} 
                editTask={editTask} 
                updateTodo={updateTodo} 
            />
            <h2>Your Tasks</h2>
            <TodoList 
    todos={userTodos} 
    editTodo={(id) => setEditTask(userTodos.find(todo => todo.id === id))}
    deleteTodo={(id) => setUserTodos(prev => prev.filter(todo => todo.id !== id))}
    toggleComplete={(id) => setUserTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))}
    updateTodo={updateTodo} // Make sure this line is present
/>

            <h2>Recommended</h2>
            <TodoList 
    todos={todos} 
    editTodo={(id) => {
        const taskToEdit = todos.find(todo => todo.id === id);
        if (taskToEdit) {
            setEditTask(taskToEdit);
        }
    }}
    updateTodo={updateRecommendedTodo} // Use updateRecommendedTodo here
    deleteTodo={(id) => setTodos(prev => prev.filter(todo => todo.id !== id))}
    toggleComplete={(id) => setTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))}
/>


            <button onClick={() => setUserTodos([])}>Delete All Your Tasks</button>
        </div>
    );
};

export default App;
