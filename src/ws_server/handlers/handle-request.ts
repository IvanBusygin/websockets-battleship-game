import { Server } from 'ws';
import { getAllWinners } from '../users/getAllWinners';
import { userAuth } from '../users/userAuth';
import { getJsonMsg } from '../utils/jsonMsg';
import { IAddShips, IAddUserToRoom, IUser } from '../types/type-req';
import { Commands, CustomWS } from '../types/common';
import { createRoom } from '../rooms/createRoom';
import { resToClient, resToAllClients, resToPlayer } from './handle-responce';
import { addUserToRoom } from '../users/addUserToRoom';
import { consoleColors } from '../utils/const';
import { addShips } from '../game/addShips';
import { getAllRooms, getRoom, removeRoom } from '../db/rooms';
import { addGame, getGame } from '../db/game';
import { getUser } from '../db/users';
import { turnPlayer } from '../game/turnPlayer';

export const handleReg = (wsServer: Server, ws: CustomWS, data: IUser) => {
  resToClient(ws, getJsonMsg(Commands.REG, userAuth(data.name, data.password, ws.id)));
  resToAllClients(wsServer, getJsonMsg(Commands.UPDATE_WINNERS, getAllWinners()));
  resToAllClients(wsServer, getJsonMsg(Commands.UPDATE_ROOM, getAllRooms()));
};

export const handleCreateRoom = (wsServer: Server, ws: CustomWS) => {
  createRoom(ws.id);
  resToAllClients(wsServer, getJsonMsg(Commands.UPDATE_ROOM, getAllRooms()));
};

export const handleAddUserToRoom = (
  wsServer: Server,
  ws: CustomWS,
  { indexRoom }: IAddUserToRoom['data'],
) => {
  if (indexRoom !== ws.id) {
    addUserToRoom(indexRoom, ws.id);

    const room = getRoom(indexRoom);

    room.roomUsers.forEach((user) => {
      const userData = {
        idGame: room.roomId,
        idPlayer: user.index,
      };

      resToPlayer(user.index, getJsonMsg(Commands.CREATE_GAME, userData));
    });
    addGame(indexRoom, room.roomUsers);

    removeRoom(indexRoom);
    resToAllClients(wsServer, getJsonMsg(Commands.UPDATE_ROOM, getAllRooms()));

    console.log(consoleColors.green, 'Room is now full. Starting game.');
  }
};

export const handleAddShips = (ws: CustomWS, data: IAddShips['data']) => {
  const allPlayersReady = addShips(ws.id, data.ships);

  if (allPlayersReady) {
    console.log(consoleColors.green, 'All players are ready. Game can start.');

    const game = getGame(data.gameId);

    const turnFirstPlayerIndex = game.roomUsers[0].index;

    game.roomUsers.forEach((roomUser) => {
      const userPlayer = getUser(roomUser.index);
      if (userPlayer) {
        const startGameData = { ships: userPlayer.ships, currentPlayerIndex: userPlayer.index };

        resToPlayer(roomUser.index, getJsonMsg(Commands.START_GAME, startGameData));

        turnPlayer(turnFirstPlayerIndex, game.idGame);
      }
    });
  }
};
