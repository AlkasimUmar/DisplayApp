import React, { useState, useEffect } from 'react';
import ListComponent from '../components/ListComponent';

export default function Home() {
  type User = {
    id: number;
    name: string;
    email: string;
    [key: string]: any;
  };
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!loading && !error && (
        <ListComponent
          items={users}
          renderItem={(user) => (
            <div>
              <strong>{user.name}</strong> <br />
              <span>{user.email}</span>
            </div>
          )}
          fallbackMessage="No users found."
        />
      )}
    </main>
  );
}
