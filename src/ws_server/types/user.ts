import { IShip } from './common';

export interface IUserDB {
  index: string;
  name: string;
  password?: string;
  wins?: number;
  ships?: IShip[];
}
