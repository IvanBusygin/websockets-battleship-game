import { IUserDB } from '../types/user';

export const users: IUserDB[] = [];

export const getCurrentUser = (socketID: string) => {
  return users.find((user) => user.index === socketID);
};
