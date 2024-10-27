export interface IUser {
  index: string;
  name: string;
  password?: string;
  wins?: number;
}

export interface IWinners {
  name: string;
  wins: number;
}
