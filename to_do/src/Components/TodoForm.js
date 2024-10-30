import React, { useState, useEffect } from 'react';
import calendarIcon from '../assets/calendar.png';

const TodoForm = ({ addTodo, editTask, updateTodo }) => {
    // State to manage task description and due date
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isDateInputOpen, setIsDateInputOpen] = useState(false);

    // Populate fields if an existing task is being edited
    useEffect(() => {
        if (editTask) {
            setTask(editTask.task);
            setDueDate(editTask.dueDate || '');
        }
    }, [editTask]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task) return; 

        // Add or update task based on if editTask exists
        addTodo({ 
            id: editTask ? editTask.id : Date.now(), 
            task, 
            completed: false, 
            dueDate 
        });
        
        // Reset form fields after submission
        setTask('');
        setDueDate('');
    };

    // Toggle date input field visibility
    const handleIconClick = () => {
        setIsDateInputOpen((prev) => !prev);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{ display: isDateInputOpen ? 'block' : 'none' }}
                />
                <button 
                    type="button" 
                    onClick={handleIconClick} 
                    style={{ background: 'none', border: 'none' }}
                >
                    <img src={calendarIcon} alt="Calendar" style={{ width: '24px', height: '24px' }} />
                </button>
            </div>
            <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TodoForm;
