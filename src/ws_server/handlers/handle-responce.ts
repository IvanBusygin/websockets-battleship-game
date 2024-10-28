import { Server, WebSocket } from 'ws';
import { dbSockets } from '../db/ws';

export const resToClient = (ws: WebSocket, response: string) => {
  ws.send(response);
};

export const resToAllClients = (server: Server, response: string) => {
  server.clients.forEach((client) => {
    client.send(response);
  });
};

export const resToPlayer = (playersId: string, response: string) => {
  const wss = dbSockets.get(playersId);
  if (wss) {
    wss.send(response);
  }
};
