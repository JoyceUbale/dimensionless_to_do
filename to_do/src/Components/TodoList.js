import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, editTodo, deleteTodo, toggleComplete }) => {
    return (
        <ul>
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        editTodo={editTodo} 
                        deleteTodo={deleteTodo} 
                        toggleComplete={toggleComplete} 
                    />
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </ul>
    );
};

export default TodoList;