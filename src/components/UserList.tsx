import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

const UserList: React.FC<{
  enabled: boolean;
  enableEscapeExit: boolean;
  setIsShowUserList: (value: boolean) => void;
}> = ({ enabled, enableEscapeExit, setIsShowUserList }) => {
  // Не показываем список, если отключено.
  if (!enabled) {
    return null;
  }

  // Значение для запроса на сервер, чтобы получить список (suggest) пользователей
  const [searchPhoneNumber, setSearchPhoneNumber] = useState<string>('');

  // Кладем сюда список пользователей, которые уже назначены к получению премии
  const [userList, setUserList] = useState<
    Array<{
      id: string;
      name: string;
      phone: string;
      avatarUrl: string;
    }>
  >([]);

  // Кладем сюда список пользователей, которых мы получили с сервер при поиске по номеру телефон, или части номера телефона
  const [suggestUserList, setSuggestUserList] = useState<
    Array<{
      id: string;
      name: string;
      phone: string;
      avatarUrl: string;
    }>
  >([]);

  // Добавляем пользователя в список на вознаграждение и обновляем список.
  const addUserToRewardList = (id: string) => {
    fetch(`https://api.example.com/rewards-users/add/${id}`)
      .then((res) => res.json())
      .then((user) => setUserList([...userList, user]));
  };

  // Удаляем пользователя из списка вознаграждений. Делаем запрос на удаление и обновляем список
  const onRemoveUserFromRewardList = (id: string) => {
    fetch(`https://api.example.com/rewards-users/remove/${id}`)
      .then((res) => res.json())
      .then(() => {
        // Ищем где находится в массиве пользователь на удаление
        const removeUserIndex = userList.findIndex((user) => user.id === id);
        // Удаляем из массива пользователя
        const userListWithRemoved = userList.splice(removeUserIndex, 1);
        // Выставляем обновленный список пользователей в стейт.
        setUserList(userListWithRemoved);
      });
  };

  // Даем по кнопке Escape скрывать весь список пользователей, если такая функциональность включена.
  if (enableEscapeExit) {
    useEffect(() => {
      window.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsShowUserList(false);
        }
      });
    });
  }

  // Делаем поиск по номеру телефона, среди всех пользователей компании.
  // Получаем список пользователей, из которого потом сможем назначить пользователя на вознаграждение
  useEffect(() => {
    fetch(`https://api.example.com/users?phone=${searchPhoneNumber}`)
      .then((res) => res.json())
      .then((data) => setSuggestUserList(data));
  }, [searchPhoneNumber]);

  // Запрашиваем список сотрудников, которые уже добавлены у руководителя в список награждения.
  useEffect(() => {
    fetch(`https://api.example.com/rewards-users`)
      .then((res) => res.json())
      .then((data) => setUserList(data));
  });

  return (
    <div>
      <div>Список сотрудников которым нужно выплатить премию:</div>

      <div>
        {userList.map((user, index) => (
          <UserCard
            id={user.id}
            avatarUrl={user.avatarUrl}
            name={user.name}
            key={index}
            phone={user.phone}
            onRemove={onRemoveUserFromRewardList}
          />
        ))}
      </div>

      {/** Поле ввода номера телефона, по которому нужно искать сотрудников */}
      <input
        type="text"
        value={searchPhoneNumber}
        onChange={(e) => setSearchPhoneNumber(e.target.value)}
        placeholder="Поиск пользователей по номеру телефона"
      />

      {/** Список сотрудников, которых начальник может добавить к награде (Suggest list) */}
      <div>
        {suggestUserList.map((user) => (
          <div>
            <img src={user.avatarUrl} />
            <div>{user.name}</div>
            <button onClick={() => addUserToRewardList(user.id)}>Добавить пользователя в список "К награждению"</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
