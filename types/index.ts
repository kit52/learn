//-------------------------------------------Partial<T> и Required<T>:
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial<T> делает все свойства типа T необязательными
type PartialUser = Partial<User>;

const partialUser: PartialUser = { id: 1 };
// Здесь мы можем присваивать только часть свойств User,
// остальные свойства будут иметь значение undefined или неопределенные

// Required<T> делает все свойства типа T обязательными
type RequiredUser = Required<User>;

const requiredUser: User = { id: 1, name: 'John', email: 'john@example.com' };
// Теперь все свойства User стали обязательными

//--------------------------------------------Readonly<T>:
interface User1 {
  id: number;
  name: string;
}

// Readonly<T> делает все свойства типа T только для чтения
type ReadonlyUser = Readonly<User1>;

const user: ReadonlyUser = { id: 1, name: 'John' };

// Мы не можем изменить свойства объекта user
// user.id = 2; // Ошибка: Не удается присвоить значение, свойство только для чтения

//------------------------------------------------------------Pick<T, K> и Omit<T, K>:
interface User2 {
  id: number;
  name: string;
  email: string;
}

// Pick<T, K> выбирает только указанные свойства из типа T
type UserBasicInfo = Pick<User2, 'id' | 'name'>;

const basicInfo: UserBasicInfo = { id: 1, name: 'John' };
// Тип UserBasicInfo теперь содержит только свойства id и name из типа User

// Omit<T, K> исключает указанные свойства из типа T
type UserWithoutEmail = Omit<User2, 'email'>;

const userWithoutEmail: UserWithoutEmail = { id: 1, name: 'John' };
// Тип UserWithoutEmail теперь содержит все свойства User, кроме свойства email

//--------------------------------------------------------Mapped-типы:
interface Person {
  name: string;
  age: number;
}

// Mapped-тип, который делает все свойства типа T только для чтения
type ReadonlyPerson<T> = { readonly [P in keyof T]: T[P] };

const readonlyPerson: ReadonlyPerson<Person> = { name: 'John', age: 30 };
// Мы не можем изменить свойства объекта readonlyPerson

// Mapped-тип, который делает все свойства типа T необязательными
type PartialPerson<T> = { [P in keyof T]?: T[P] };

const partialPerson: PartialPerson<Person> = { name: 'John' };
// Мы можем присвоить только часть свойств объекта partialPerson

// -----------------------------------------------------Явное и неявное приведение типов:
let num: number = 5;
let str: string = '10';

// Явное приведение типов
let sum1: number = num + Number(str); // Используем функцию Number для преобразования строки в число

// Неявное приведение типов
let sum2: string = num + str; // Строковое преобразование, потому что один из операндов - строка

//-------------------------- Восклицательный знак в TypeScript:
interface User3 {
  id: number;
  name?: string; // Необязательное свойство
}

let user1: User3 = { id: 1 };
// Допустимо, так как свойство name необязательное

let user2: User3 = { id: 2, name: 'John' };
// Допустимо, так как мы предоставили значение для свойства name

let user3: User3 = { id: 3, name: undefined };
// Допустимо, так как мы можем явно указать undefined

let user4: User3 = { id: 4, name: null };
// Ошибка, null не является допустимым значением для необязательного свойства

let userName: string = user1.name!;
// Приведение типа, здесь мы утверждаем, что свойство name определено, поэтому добавляем восклицательный знак

//------------------------------------------------------Record или Object типы:
// Record<K, T> создает тип, представляющий объект, у которого ключи имеют тип K, а значения - тип T
type UserRecord = Record<string, number>;

const userRecord: UserRecord = { id: 1, age: 30 };
// Тип UserRecord описывает объект, где ключи являются строками, а значения - числами

// Object используется для представления любого объекта в JavaScript
let obj: object = { id: 1, name: 'John' };
// Здесь obj может содержать любой объект, но его структура неизвестна

//-----------------------------------------------------Tupple в TypeScript:

// Tupple в TypeScript - это массив с фиксированным количеством элементов и известными типами для каждого элемента по индексу
let tupple: [string, number] = ['John', 30];

let name1: string = tupple[0]; // Получаем имя из кортежа
let age: number = tupple[1]; // Получаем возраст из кортежа

// При попытке получить доступ к несуществующему индексу TypeScript будет выдавать ошибку
// let thirdItem: string = tupple[2]; // Ошибка: Тип number не может быть присвоен типу string

function sanitize<T>(array: Array<T>) {}
// END

export default sanitize;
