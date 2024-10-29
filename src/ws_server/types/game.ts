import { IRoomUsers } from './type-res';
import { IShip } from './common';

export interface IGame {
  idGame: string;
  roomUsers: IGameRoomUsers[];
  ships?: IShip[];
}

export interface IGameRoomUsers extends IRoomUsers {
  turnIndex?: string;
}
