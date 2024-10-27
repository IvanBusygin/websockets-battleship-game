import { users } from '../db/users';
import { IWinners } from '../types/user';

export const getAllWinners = (): IWinners[] => {
  return [...users.values()]
    .filter((user) => user.wins > 0)
    .map((user) => ({
      name: user.name || 'Unknown',
      wins: user.wins,
    }));
};
