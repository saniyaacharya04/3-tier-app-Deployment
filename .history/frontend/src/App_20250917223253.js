import { useState } from 'react';
import Tasks from './Tasks';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <Tasks user={user} />
      )}
    </div>
  );
}

export default App;
