import { IUserDB } from '../types/user';

export const users: IUserDB[] = [];

export const getUser = (userId: string) => {
  return users.find((user) => user.index === userId);
};
