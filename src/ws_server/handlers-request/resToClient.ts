import { WebSocket } from 'ws';

export const resToClient = (ws: WebSocket, response: string) => {
  ws.send(response);
};
