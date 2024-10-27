import { Commands, IPosition, TypeShip } from './common';

export type IResponses =
  | IRes
  | IUpdateRoom
  | IUpdateWinners
  | ICreateGame
  | IStartGame
  | ITurn
  | IAttack
  | IFinish;

export interface IRes {
  type: Commands.REG;
  data: {
    name: string;
    index: number | string;
    error: boolean;
    errorText: string;
  };
  id: 0;
}

export interface IUpdateRoom {
  type: Commands.UPDATE_ROOM;
  data: {
    roomId: number | string;
    roomUsers: {
      name: string;
      index: number | string;
    }[];
  }[];
  id: 0;
}

export interface IUpdateWinners {
  type: Commands.UPDATE_WINNERS;
  data: {
    name: string;
    wins: number;
  }[];
  id: 0;
}

export interface ICreateGame {
  type: Commands.CREATE_GAME; // Sent for both players in the room after they are connected
  data: {
    idGame: number | string; // Unique identifier for the game
    idPlayer: number | string; // Unique identifier for the player in the game session
  };
  id: 0; // Identifier for the update
}

export interface IStartGame {
  type: Commands.START_GAME; // Indicates the action to start the game
  data: {
    ships: {
      position: IPosition;
      direction: boolean; // Direction of the ship (true for one direction, false for the opposite)
      length: number; // Length of the ship
      type: TypeShip;
    }[];
    currentPlayerIndex: number | string; // ID of the player who sent their ships
  };
  id: 0; // Identifier for this specific update
}

export interface ITurn {
  type: Commands.TURN; // Indicates the action for the player's turn
  data: {
    currentPlayer: number | string; // ID of the player in the current game session
  };
  id: 0; // Identifier for this specific update
}

export interface IAttack {
  type: Commands.ATTACK; // Indicates the action for an attack
  data: {
    position: IPosition;
    currentPlayer: number | string; // ID of the player in the current game session
    status: 'miss' | 'killed' | 'shot'; // Status of the attack
  };
  id: 0; // Identifier for this specific update
}

export interface IFinish {
  type: Commands.FINISH; // Indicates the action to finish the game
  data: {
    winPlayer: number | string; // ID of the player who won in the current game session
  };
  id: 0; // Identifier for this specific update
}
