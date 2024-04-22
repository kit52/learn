import React from 'react';
import BeautifulComment from 'react-best-comment/ui';

const UserCard: React.FC<{
  id?: number;
  name: string;
  avatarUrl: string;
  comments: Array<{ id: string; date: string; avatarUrl: string }>;
}> = ({ avatarUrl, id, name, comments }) => {
  return (
    <div key={id}>
      <img src={avatarUrl} />
      <p>{name}</p>
      {comments.map((comment) => (
        <BeautifulComment data={comment} />
      ))}
    </div>
  );
};

export default UserCard;
