import { getUser } from '../db/users';
import { consoleColors } from '../utils/const';
import { games } from '../db/game';
import { IShip } from '../types/common';

export const addShips = (socketID: string, ships: IShip[]) => {
  const user = getUser(socketID);
  if (!user) {
    console.log(consoleColors.red, 'Player not found');
    return;
  }

  user.ships = ships;

  const game = games.find((game) => game.roomUsers.some((user) => user.index === socketID));

  if (!game) {
    console.log(consoleColors.red, 'Game not found for the player');
    return;
  }

  const allPlayersReady = game.roomUsers.every((user) => {
    const { ships } = getUser(user.index) || {};
    return !!ships;
  });

  return allPlayersReady;
};
