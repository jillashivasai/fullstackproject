import React from 'react';
import './index.css'

const TaskItems = ({ task, handleCheckboxChange }) => {
  const { id, title, status,assignedTo } = task;

  return (
    <li>
    <div className='taski-tem-container'>
      <h3 className='font-size weight'>{title}</h3>
      <p className= {`font-size m-r ${status==='pending'?'pending':'completed'}`}>{status}</p>
      <p className='font-size m-r'>{assignedTo}</p>
      <p className='font-size'>
        <input
          type="checkbox"
          className='checkbox'
          checked={status === 'complete'}
          onChange={() => handleCheckboxChange(id)}
        />
      </p>
      </div>
    </li>
  );
};

export default TaskItems;
