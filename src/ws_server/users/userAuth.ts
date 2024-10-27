import { users } from '../db/users';
import { generateHash } from '../utils/hash';
import { IRes } from '../types/type-res';

export const userAuth = (name: string, password: string, socketID: string): IRes['data'] => {
  let errorText = '';
  let isError = false;

  const user = users.find((user) => user.name === name);
  if (!user) {
    if (!/^[a-zA-Z-]+$/.test(name)) {
      isError = true;
      errorText = 'Name must contain only letters';
    } else {
      users.push({
        name,
        password: generateHash(password),
        index: socketID,
        wins: 0,
      });
    }
  } else {
    if (user.password !== generateHash(password)) {
      isError = true;
      errorText = 'Wrong password';
    } else {
      user.index = socketID;
    }
  }

  return {
    name,
    index: socketID,
    error: isError,
    errorText,
  };
};
