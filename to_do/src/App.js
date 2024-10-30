import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import nightModeIcon from '../src/assets/night-mode.png';
import sunIcon from '../src/assets/sun.png';
import "../src/App.css";

const App = () => {
    // State to store list of todos fetched from API
    const [todos, setTodos] = useState([]);
    // State to store user-added todos
    const [userTodos, setUserTodos] = useState([]);
    // State to manage the current task being edited
    const [editTask, setEditTask] = useState(null);
    // State to manage theme (dark/light mode)
    const [darkMode, setDarkMode] = useState(false);

    // Fetch todos on initial render, and update theme when darkMode state changes
    useEffect(() => {
        fetchTodos();
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    // Function to fetch todos from an API
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

    // Add a new todo to userTodos, sorted by due date
    const addTodo = (newTodo) => {
        setUserTodos(prev => 
            [newTodo, ...prev].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        );
    };

    // Update an existing user todo
    const updateTodo = (id, newTask, newDueDate) => {
        setUserTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, task: newTask, dueDate: newDueDate } : todo
            )
        );
    };

    // Update a recommended todo item
    const updateRecommendedTodo = (id, newTask, newDueDate) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, task: newTask, dueDate: newDueDate } : todo
            )
        );
    };

    // Toggle theme between dark and light mode
    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="App">
            {/* Toggle theme button with icons */}
            <button className="toggle-theme-btn" onClick={toggleTheme}>
                <img src={darkMode ? sunIcon : nightModeIcon} alt="Toggle Theme" style={{ width: '24px', height: '24px' }} />
            </button>
            <div className='h1t'>Tick Karo</div>

            {/* Todo form to add or edit tasks */}
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
                toggleComplete={(id) => setUserTodos(prev => 
                    prev.map(todo =>
                        todo.id === id ? { ...todo, completed: !todo.completed } : todo
                    )
                )}
                updateTodo={updateTodo}
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
                updateTodo={updateRecommendedTodo}
                deleteTodo={(id) => setTodos(prev => prev.filter(todo => todo.id !== id))}
                toggleComplete={(id) => setTodos(prev => 
                    prev.map(todo =>
                        todo.id === id ? { ...todo, completed: !todo.completed } : todo
                    )
                )}
            />

            {/* Button to delete all user tasks */}
            <button onClick={() => setUserTodos([])}>Delete All Your Tasks</button>
        </div>
    );
};

export default App;
