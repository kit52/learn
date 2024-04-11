import React from 'react';
import AdditionUserInfo from '@project-components/additional-user-info';

const UserCard: React.FC<{
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
  onRemove: (id: string) => void;
}> = ({ avatarUrl, id, name, onRemove, phone }) => {
  return (
    <div key={id}>
      <img src={avatarUrl} />
      <div>{name}</div>
      {/** Компонент получения дополнительной информации о сотруднике */}
      <AdditionUserInfo userInfo={{ id, phone }} />
      <button onClick={() => onRemove(id)}>Удалить сотрудника из списка награждения</button>
    </div>
  );
};

export default UserCard;
