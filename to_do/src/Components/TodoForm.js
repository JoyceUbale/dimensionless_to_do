import React, { useState, useEffect } from 'react';
import calendarIcon from '../assets/calendar.png';

const TodoForm = ({ addTodo, editTask , updateTodo}) => {
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isDateInputOpen, setIsDateInputOpen] = useState(false);

    useEffect(() => {
        if (editTask) {
            setTask(editTask.task);
            setDueDate(editTask.dueDate || '');
        }
    }, [editTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task) return;

        addTodo({ id: editTask ? editTask.id : Date.now(), task, completed: false, dueDate });
        setTask('');
        setDueDate('');
    };

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
                <button type="button" onClick={handleIconClick} style={{ background: 'none', border: 'none' }}>
                    <img src={calendarIcon} alt="Calendar" style={{ width: '24px', height: '24px' }} />
                </button>
            </div>
            <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TodoForm;
