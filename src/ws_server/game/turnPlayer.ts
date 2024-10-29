import { getUser } from '../db/users';
import { getTurnIndex, getGame } from '../db/game';
import { resToPlayer } from '../handlers/handle-responce';
import { getJsonMsg } from '../utils/jsonMsg';
import { Commands } from '../types/common';

export const turnPlayer = (currentPlayerIndex: string, gameId: string) => {
  const game = getGame(gameId);
  if (game) {
    game.roomUsers.forEach((roomUser) => {
      const userPlayer = getUser(roomUser.index);
      if (userPlayer) {
        const turnData = {
          currentPlayer: getTurnIndex(currentPlayerIndex, gameId),
        };
        resToPlayer(roomUser.index, getJsonMsg(Commands.TURN, turnData));
      }
    });
  }
};
