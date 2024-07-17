import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // Define ItemTypes constants

const Todo = ({ addEvent }) => {
  const [todos, setTodos] = useState([]);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TODO },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const addTodo = (title) => {
    const newTodo = {
      id: todos.length + 1,
      title: title,
      start: null, // Initialize with null start and end
      end: null,
    };
    setTodos([...todos, newTodo]);

    // Optionally, pass newTodo to addEvent function to add it to the calendar
    if (addEvent) {
      addEvent(newTodo);
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    // Optionally, pass id to deleteEvent function to remove it from the calendar
    // deleteEvent(id);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            ref={drag} // Attach drag ref to each todo item
            style={{ opacity: isDragging ? 0.5 : 1 }} // Dim when dragging
          >
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter todo"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button onClick={() => addTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default Todo;
