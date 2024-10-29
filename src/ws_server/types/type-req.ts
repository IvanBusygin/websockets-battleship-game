import { Commands, IShip } from './common';

export type IRequest =
  | IReg
  | ICreateRoom
  | IAddUserToRoom
  | IAddShips
  | IAttack
  | IRandomAttack
  | ISinglePlay;

export interface IReg {
  type: Commands.REG;
  data: IUser;
  id: 0;
}

export interface ICreateRoom {
  type: Commands.CREATE_ROOM;
  data: '';
  id: 0;
}

export interface IAddUserToRoom {
  type: Commands.ADD_USER_TO_ROOM;
  data: {
    indexRoom: string;
  };
  id: 0;
}

export interface IAddShips {
  type: Commands.ADD_SHIPS;
  data: {
    gameId: string;
    ships: IShip[];
    indexPlayer: string;
  };
  id: 0;
}

export interface IAttack {
  type: Commands.ATTACK;
  data: {
    gameId: number;
    x: number;
    y: number;
    indexPlayer: string;
  };
  id: 0;
}

export interface IRandomAttack {
  type: Commands.RANDOM_ATTACK;
  data: {
    gameId: number;
    indexPlayer: string;
  };
  id: 0;
}

export interface ISinglePlay {
  type: Commands.SINGLE_PLAY;
  data: '';
  id: 0;
}

export interface IUser {
  name: string;
  password: string;
}
