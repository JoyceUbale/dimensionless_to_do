import React, { useState } from 'react';
// import calendarIcon from '../assets/calendar.png';  // Optional import for future use
import deleteIcon from '../assets/trash.png';
import editIcon from '../assets/written-paper.png';
import completeIcon from '../assets/check-mark.png';

const TodoItem = ({ todo, editTodo, deleteTodo, toggleComplete, updateTodo }) => {
    // Local state for managing edit mode and input values for task and due date
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(todo.task);
    const [dueDate, setDueDate] = useState(todo.dueDate || '');

    // Function to save changes made to the task and due date
    const handleSave = () => {
        if (typeof updateTodo === 'function') {
            updateTodo(todo.id, task, dueDate);
            setIsEditing(false); 
        } else {
            console.error('updateTodo is not a function');
        }
    };

    return (
        <li className={todo.completed ? "completed" : ""}>
            {isEditing ? (
                <>
                    {/* Edit mode: inputs for updating task and due date */}
                    <input 
                        type="text" 
                        value={task} 
                        onChange={(e) => setTask(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    {/* Display task and optional due date when not editing */}
                    <span className="task-text">{todo.task}</span>
                    {todo.dueDate && <span style={{ color: '#888' }}>Due: {todo.dueDate}</span>}

                    {/* Button group for managing todo actions */}
                    <div className="button-group">
                        {/* Toggle completion status */}
                        <button className="complete" onClick={() => toggleComplete(todo.id)}>
                            <img src={completeIcon} alt="Toggle Complete" style={{ width: '16px', height: '16px' }} /> 
                            {todo.completed ? "Undo" : "Complete"}
                        </button>

                        {/* Enter edit mode */}
                        <button className="edit" onClick={() => setIsEditing(true)}>
                            <img src={editIcon} alt="Edit" style={{ width: '16px', height: '16px' }} /> Edit
                        </button>

                        {/* Delete the todo item */}
                        <button className="delete" onClick={() => deleteTodo(todo.id)}>
                            <img src={deleteIcon} alt="Delete" style={{ width: '16px', height: '16px' }} /> Delete
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
