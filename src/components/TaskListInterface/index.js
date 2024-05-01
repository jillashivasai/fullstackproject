import React, { useState, useEffect } from 'react';
import TaskItems from '../TaskItems';
import TaskSummaryPage from '../TaskSummaryPage';
import { v4 as uuidv4 } from 'uuid';
import './taskinterface.css';

const TaskListInterface = () => {
  const [newTask, setNewTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks') || [];
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); 
  

  const addTask = () => {
    if (newTask.trim() !== '' && assignedTo !== '') {
      const task = {
        id: uuidv4(),
        title: newTask,
        status: 'pending',
        
        assignedTo: assignedTo
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setAssignedTo('');
      setError('');
    } else {
      setError('Please fill out all fields.');
    }
  };

  // const addTask = async () => {
  //   if (newTask.trim() !== '' && assignedTo !== '') {
  //     const task = {
  //       id: uuidv4(),
  //       title: newTask,
  //       status: 'pending',
  //       assignedTo: assignedTo
  //     };
  
  //     try {
  //       const options= {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(task)
  //       }
  //       const response = await fetch('http://localhost:8080/newuser',options);
  //       if (!response.ok) {
  //         throw new Error('Failed to add task');
  //       }
  
  //       // Update local state with the new task
  //       setTasks([...tasks, task]);
  //       setNewTask('');
  //       setAssignedTo('');
  //       setError('');
  //     } catch (error) {
  //       setError('Failed to add task');
  //       console.error(error);
  //     }
  //   } else {
  //     setError('Please fill out all fields.');
  //   }
  // };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAssignedToChange = (event) => {
    setAssignedTo(event.target.value);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: task.status === 'complete' ? 'pending' : 'complete' } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='align-center'>
      <h1>Task List</h1>
      <div className='d-flex'>
        <div className='height'>
          <input
            type='text'
            value={newTask}
            onChange={handleInputChange}
            placeholder='Add new task'
            className='width'
          />

          <select value={assignedTo} onChange={handleAssignedToChange} className='width-50'>
            <option value=''>Assign to:</option>
            <option value='user1'>User 1</option>
            <option value='user2'>User 2</option>
            <option value='team1'>Team 1</option>
            <option value='team2'>Team 2</option>
          </select>

          <button onClick={addTask} className='add-btn'>
            Add Task
          </button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <p style={{ color: 'blue' }}>Tick the check box to complete your task</p>
        </div>
        
        <img
          src='https://media.istockphoto.com/id/1142608291/vector/businessman-character-mark-checklist-with-pen-businesswoman-completion-business-task-goal.jpg?s=612x612&w=0&k=20&c=rDYTH3Ompaq3itc0ywdtkqfCk51Te8umCXT3nBjRwz8='
          alt='todo'
          className='img'
        />
      </div>

      <div>
        <ul className='task-nav'>
          <li className='font'>Title</li>
          <li className='font'>Status</li>
          <li className='font'>Assigned To</li>
          <li className='font'>Actions</li>
        </ul>
      </div>
      {tasks.map((task) => (
        <TaskItems key={task.id} task={task} handleCheckboxChange={handleCheckboxChange} />
      ))}
      <TaskSummaryPage tasks={tasks} />
    </div>
  );
};

export default TaskListInterface;
