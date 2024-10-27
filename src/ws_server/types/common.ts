import WebSocket from 'ws';

export interface CustomWS extends WebSocket {
  id: string;
}

export enum Commands {
  ADD_SHIPS = 'add_ships',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ATTACK = 'attack',
  CREATE_GAME = 'create_game',
  CREATE_ROOM = 'create_room',
  FINISH = 'finish',
  RANDOM_ATTACK = 'randomAttack',
  REG = 'reg',
  SINGLE_PLAY = 'single_play',
  START_GAME = 'start_game',
  TURN = 'turn',
  UPDATE_ROOM = 'update_room',
  UPDATE_WINNERS = 'update_winners',
}

export interface IPosition {
  x: number; // X-coordinate of the attack position
  y: number; // Y-coordinate of the attack position
}

export type TypeShip = 'small' | 'medium' | 'large' | 'huge'; // Type of the ship

export interface IShip {
  position: IPosition;
  direction: boolean;
  length: number;
  type: TypeShip;
  shipCells?: { x: number; y: number; status: 1 | 3 | 4 }[];
  isKilled?: boolean;
}
