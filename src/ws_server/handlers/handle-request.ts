import { Server } from 'ws';
import { getAllWinners } from '../users/getAllWinners';
import { userAuth } from '../users/userAuth';
import { getJsonMsg } from '../utils/jsonMsg';
import { IAddUserToRoom, IUser } from '../types/type-req';
import { Commands, CustomWS } from '../types/common';
import { createRoom } from '../rooms/createRoom';
import { resToClient, resToAllClients, resToPlayer } from './handle-responce';
import { addUserToRoom } from '../users/addUserToRoom';
import { consoleColors } from '../utils/const';
import { getAllRooms, getRoom, removeRoom } from '../db/rooms';
import { addGame } from '../db/game';

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
};
