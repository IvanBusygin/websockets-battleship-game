import { users } from '../db/users';
import { IWinners } from '../types/type-res';

export const getAllWinners = (): IWinners[] => {
  return users
    .filter((user) => user.wins > 0)
    .map((user) => ({
      name: user.name ?? 'Unknown',
      wins: user.wins,
    }));
};
