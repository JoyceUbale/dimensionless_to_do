import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, editTodo, deleteTodo, toggleComplete, updateTodo }) => (
    <ul>
        {todos.map(todo => (
            <TodoItem 
                key={todo.id} 
                todo={todo} 
                editTodo={editTodo} 
                deleteTodo={deleteTodo} 
                toggleComplete={toggleComplete} 
                updateTodo={updateTodo} // Pass the updateTodo function here
            />
        ))}
    </ul>
);


export default TodoList;