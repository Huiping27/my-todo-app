import React, { useState } from 'react';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li 
            key={index} 
            onClick={() => toggleTaskCompletion(index)} 
            style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
