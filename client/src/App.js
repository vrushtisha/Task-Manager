import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import TaskManager from './Components/TaskManager';
import Notifications from './Components/Notifications';
import Settings from './Components/Settings';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="container py-5">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <Link className="nav-link" to="/">Tasks</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notifications">Notifications</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/settings">Settings</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<TaskManager tasks={tasks} fetchTasks={fetchTasks} />} />
          <Route path="/notifications" element={<Notifications tasks={tasks} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
