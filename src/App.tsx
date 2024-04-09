import React, { useState } from 'react';
import UserList from './components/UserList';

function App() {
  const [isShowUserList, setIsShowUserList] = useState(true);

  return (
    <div className="App">
      <UserList enabled={isShowUserList} setIsShowUserList={setIsShowUserList} enableEscapeExit />
      {/** Кнопка чтобы показать список пользователей к награде */}
      <button onClick={() => setIsShowUserList(true)}>Показать пользователей к награде</button>
    </div>
  );
}

export default App;
// Template for Review
// \ No newline at end of file
// ## Pull request для Собеседования

// #### Что из себя представляет приложение?

// Приложение из себя представляет список сотрудников, которых начальник может добавить к награждению премией.
// Начальник при загрузке страницы, получает список пользователей, которых он уже добавил в список тех, кто получит премию.
// Так же он может в поле поиска, ввести номер телефона,или часть номера телефона, и получит с сервера список сотрудников удволетворяющих поиску.
// Он может добавить кого-то из этого списка в список людей, которым положена премия.
// Так же начальник может удалить сотрудника из списка людей, которым положена премия.
