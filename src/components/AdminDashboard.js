import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import CSS for styling

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    // Fetch users and tasks on component mount
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        console.log('Fetched users:', usersResponse.data); // Debugging line
        setUsers(usersResponse.data);
        const tasksResponse = await axios.get('http://localhost:5000/api/tasks');
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, assignedTo };
      console.log('Assigning task:', newTask); // Debugging line
      await axios.post('http://localhost:5000/api/tasks', newTask);
      setTitle('');
      setDescription('');
      setAssignedTo('');
      // Refresh tasks
      const tasksResponse = await axios.get('http://localhost:5000/api/tasks');
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error assigning task', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="task-form">
        <h2>Assign Task</h2>
        <form onSubmit={handleAssignTask}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
          <button type="submit">Assign Task</button>
        </form>
      </div>
      <div className="task-list">
        <h2>Task Progress</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> - {task.status} (Assigned to: {task.assignedTo.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard; 