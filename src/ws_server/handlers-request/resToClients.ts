import { Server } from 'ws';

export const resToClients = (server: Server, response: string) => {
  server.clients.forEach((client) => {
    client.send(response);
  });
};
