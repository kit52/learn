import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

const UserSearch: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  if (!enabled) {
    return null;
  }

  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<
    Array<{
      id: number;
      name: string;
      avatarUrl: string;
      comments: Array<{ id: string; date: string; avatarUrl: string }>;
    }>
  >([]);

  // Даем искать пользователей по email адрессу
  const fetchUsers = (email: string) => {
    fetch(`https://api.example.com/usersByEmail?email=${email}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handleSubmit = () => {
    fetchUsers(query);
  };

  const handleSumbitByKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchUsers(query);
    }
  };

  // Даем по кнопке Enter сделать запрос
  useEffect(() => {
    window.addEventListener('keypress', handleSumbitByKey);
  });

  // Запрашиваем вначале всех ползователей и отображаем
  useEffect(() => {
    fetch(`https://api.example.com/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  });

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..." />
      <button onClick={handleSubmit}>Search</button>

      <ul>
        {users.map((user, index) => (
          <UserCard avatarUrl={user.avatarUrl} name={user.name} key={index} comments={user.comments} />
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
