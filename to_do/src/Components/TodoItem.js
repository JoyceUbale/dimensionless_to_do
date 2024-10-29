import React from 'react';

const TodoItem = ({ todo, editTodo, deleteTodo, toggleComplete }) => {
    return (
        <li style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none' 
        }}>
            {todo.task}
            <button onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;