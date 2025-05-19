import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(""); // State to handle deadline input
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post('/api/tasks', { title, deadline });
    setTitle('');
    setDeadline('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDeadline(task.deadline?.split("T")[0] || "");
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDeadline('');
  };

  const updateTask = async (id) => {
    await axios.put(`/api/tasks/${id}`, {
      title: editTitle,
      deadline: editDeadline
    });

    setEditingTaskId(null);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="card shadow">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Task Manager</h2>

        <div className="input-group mb-3">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
          <input
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTask}>Add Task</button>
        </div>

        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              {editingTaskId === task._id ? (
                <div className="w-100">
                  <input
                    className="form-control mb-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="date"
                    className="form-control mb-2"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                  />
                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={() => updateTask(task._id)}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <strong>{task.title}</strong>
                    {task.deadline && (
                      <div><small>Deadline: {new Date(task.deadline).toLocaleDateString()}</small></div>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => startEditing(task)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;
