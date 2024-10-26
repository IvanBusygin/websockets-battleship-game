import { httpServer } from './http_server';

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
