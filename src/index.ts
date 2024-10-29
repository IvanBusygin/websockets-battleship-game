import { httpServer } from './http_server';
import { webSocketServer } from './ws_server';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the  http://localhost:${HTTP_PORT}`);
});

webSocketServer(WS_PORT).on('listening', () => {
  console.log(`Start WebSocket server on the ${WS_PORT} port!`);
});
