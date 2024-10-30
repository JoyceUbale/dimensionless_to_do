import React from 'react';
import TodoItem from './TodoItem';

// Component to render the list of todos
const TodoList = ({ todos, editTodo, deleteTodo, toggleComplete, updateTodo }) => (
    <ul>
        {todos.map(todo => (
            // Render each TodoItem and pass down necessary props
            <TodoItem 
                key={todo.id} 
                todo={todo} 
                editTodo={editTodo} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete} 
                updateTodo={updateTodo} 
            />
        ))}
    </ul>
);

export default TodoList;
