import { IRoomUsers } from './type-res';

export interface IRoomDB {
  roomId: string;
  roomUsers: IRoomUsers[];
}
