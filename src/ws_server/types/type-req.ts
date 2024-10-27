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
  data: {
    name: string;
    password: string;
  };
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
    indexRoom: number;
  };
  id: 0;
}

export interface IAddShips {
  type: Commands.ADD_SHIPS;
  data: {
    gameId: number;
    ships: IShip[];
    indexPlayer: number;
  };
  id: 0;
}

export interface IAttack {
  type: Commands.ATTACK;
  data: {
    gameId: number;
    x: number;
    y: number;
    indexPlayer: number;
  };
  id: 0;
}

export interface IRandomAttack {
  type: Commands.RANDOM_ATTACK;
  data: {
    gameId: number;
    indexPlayer: number;
  };
  id: 0;
}

export interface ISinglePlay {
  type: Commands.SINGLE_PLAY;
  data: '';
  id: 0;
}
