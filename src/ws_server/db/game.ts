import { IGame } from '../types/game';
import { IRoomUsers } from '../types/type-res';

export const games: IGame[] = [];

export const addGame = (idGame: string, roomUsers: IRoomUsers[]) => {
  games.push({ idGame, roomUsers });
};

export const getGame = (idGame: string) => {
  return games.find((game) => game.idGame === idGame);
};

export const removeGame = (idGame: string) => {
  const gameIndex = games.findIndex((room) => room.idGame === idGame);
  if (gameIndex > 0) {
    games.splice(gameIndex, 1);
  }
};
