import { Server } from 'ws';
import { getAllWinners } from '../users/getAllWinners';
import { userAuth } from '../users/userAuth';
import { getJsonMsg } from '../utils/jsonMsg';
import { IReg } from '../types/type-req';
import { Commands, CustomWS } from '../types/common';
import { resToClient } from './resToClient';
import { resToClients } from './resToClients';

export const handleREG = (wsServer: Server, ws: CustomWS, data: IReg['data']) => {
  resToClient(ws, getJsonMsg(Commands.REG, userAuth(data.name, data.password, ws.id)));
  resToClients(wsServer, getJsonMsg(Commands.UPDATE_WINNERS, getAllWinners()));
};
