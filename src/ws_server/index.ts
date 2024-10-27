import { randomUUID } from 'crypto';
import { WebSocketServer } from 'ws';
import { deepParseJson } from './utils/json';
import { dbSockets } from './db/ws';
import { handleCreateRoom, handleReg } from './handlers-request/handle-request';
import { IRequest } from './types/type-req';
import { Commands, CustomWS } from './types/common';

export const webSocketServer = (port: number = 3000) => {
  const wsServer = new WebSocketServer({
    port,
  });

  wsServer.on('connection', (ws: CustomWS) => {
    const currentSocketID = randomUUID();
    ws.id = currentSocketID;
    dbSockets.set(currentSocketID, ws);
    console.log(`New WS client ${currentSocketID}`);

    ws.on('message', (rawData) => {
      try {
        const { type, data } = deepParseJson(rawData.toString()) as IRequest;

        console.log('type:', type, '|', 'data:', data);

        switch (type) {
          case Commands.REG: {
            handleReg(wsServer, ws, data);
            break;
          }

          case Commands.CREATE_ROOM: {
            handleCreateRoom(wsServer, ws);
            break;
          }

          case Commands.ADD_USER_TO_ROOM: {
            break;
          }
          case Commands.ADD_SHIPS: {
            break;
          }
          case Commands.ATTACK: {
            break;
          }
          case Commands.RANDOM_ATTACK: {
            break;
          }
          case Commands.SINGLE_PLAY: {
            break;
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    ws.on('close', () => {
      dbSockets.delete(currentSocketID);
      console.log(`Disconnect client ${currentSocketID}. Goodbye!`);
      console.log(`Numbers of clients: ${dbSockets.size} at this moment`);
    });
  });

  return wsServer;
};
