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

export const getTurnIndex = (indexPlayer: string, gameId: string): string => {
  const game = games.find((game) => game.idGame === gameId);

  if (!game) {
    console.log(`Game not found: ${gameId}`);
    return '';
  }

  const currentPlayerIndex = game.roomUsers.findIndex((user) => user.index === indexPlayer);
  const nextPlayerIndex = (currentPlayerIndex + 1) % game.roomUsers.length;

  game.roomUsers.forEach((user) => {
    user.turnIndex = game.roomUsers[nextPlayerIndex].index;
  });

  return game.roomUsers[nextPlayerIndex].index;
};
