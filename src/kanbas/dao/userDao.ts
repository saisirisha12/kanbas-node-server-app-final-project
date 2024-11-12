import db from "../database/index";

let { users } = db;

export const createUser = (user: any) => {
  const newUser = { ...user, _id: users[users.length - 1]._id + 1 };
  users = [...users, newUser];
  return newUser;
};

export const findAllUsers = () => users;

export const findUserById = (id: number) =>
  users.find((user) => user._id === id);

export const findUserByUsername = (username: string) =>
  users.find((user) => user.username === username);

export const findUserByCredentials = (username: string, password: string) =>
  users.find(
    (user) => user.username === username && user.password === password
  );

export const updateUser = (id: number, user: any) =>
  (users = users.map((u) => (u._id === id ? user : u)));

export const deleteUser = (id: number) =>
  (users = users.filter((u) => u._id !== id));
