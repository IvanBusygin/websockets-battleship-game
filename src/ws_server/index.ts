import WebSocket, { WebSocketServer } from 'ws';
import { deepParseJson } from './utils/json';
import { IRequest } from './types/type-req';
import { Commands } from './types/common';

export const webSocketServer = (port: number = 3000) => {
  const webSocketServer = new WebSocketServer({
    port,
  });

  webSocketServer.on('connection', (ws: WebSocket) => {
    ws.on('message', (rawData) => {
      try {
        const { type, data } = deepParseJson(rawData.toString()) as IRequest;

        console.log('type:', type, '|', 'data:', data);

        switch (type) {
          case Commands.REG: {
            break;
          }
          case Commands.CREATE_ROOM: {
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
      console.log('Goodbye!');
    });
  });

  return webSocketServer;
};
