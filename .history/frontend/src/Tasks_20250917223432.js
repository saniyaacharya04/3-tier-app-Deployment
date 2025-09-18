import { useEffect, useState } from 'react';

export default function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/tasks/user/${user.id}`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks', err);
      }
    };
    fetchTasks();
  }, [user.id]);

  return (
    <div>
      <h2>{user.name}'s Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
