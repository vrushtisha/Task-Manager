import React from 'react';

function Notifications({ tasks = [] }) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) =>
    new Date(date).toISOString().split('T')[0]; 

  const tomorrowTasks = tasks.filter(
    (task) =>
      task.deadline &&
      formatDate(task.deadline) === formatDate(tomorrow)
  );

  return (
    <div className="card shadow mt-4">
      <div className="card-body">
        <h3 className="card-title">Notifications</h3>
        {tomorrowTasks.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <ul className="list-group">
            {tomorrowTasks.map((task) => (
              <li key={task._id} className="list-group-item">
                ⏰ Task "<strong>{task.title}</strong>" is due tomorrow!
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Notifications;
