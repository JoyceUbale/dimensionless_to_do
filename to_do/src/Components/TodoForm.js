import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task) return;
        addTodo({ id: Date.now(), task, completed: false });
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="todo-input" // Unique ID for the input field
                name="todo" // Name attribute for autofill
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Add a new task" 
                autoComplete="off" // Optional: Disable autocomplete if needed
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoForm;