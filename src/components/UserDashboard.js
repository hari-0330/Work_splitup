import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';

function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/user/${userId}`);
        console.log('Fetched tasks:', response.data); // Debugging line
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    if (userId) {
      console.log('User ID:', userId); // Debugging line
      fetchTasks();
    } else {
      console.error('User ID not found');
    }
  }, [userId]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <div className="task-list">
        <h2>My Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> - {task.status}
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard; 