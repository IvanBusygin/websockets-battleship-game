import { Server } from 'ws';
import { getAllWinners } from '../users/getAllWinners';
import { userAuth } from '../users/userAuth';
import { getJsonMsg } from '../utils/jsonMsg';
import { IUser } from '../types/type-req';
import { Commands, CustomWS } from '../types/common';
import { resToClient } from './resToClient';
import { resToClients } from './resToClients';
import { createRoom } from '../rooms/createRoom';
import { getAllRooms } from '../rooms/getAllRooms';

export const handleReg = (wsServer: Server, ws: CustomWS, data: IUser) => {
  resToClient(ws, getJsonMsg(Commands.REG, userAuth(data.name, data.password, ws.id)));
  resToClients(wsServer, getJsonMsg(Commands.UPDATE_WINNERS, getAllWinners()));
  resToClients(wsServer, getJsonMsg(Commands.UPDATE_ROOM, getAllRooms()));
};

export const handleCreateRoom = (wsServer: Server, ws: CustomWS) => {
  createRoom(ws.id);
  resToClients(wsServer, getJsonMsg(Commands.UPDATE_ROOM, getAllRooms()));
};
