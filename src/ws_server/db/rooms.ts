import { IRoomDB } from '../types/rooms';

export const rooms: IRoomDB[] = [];

export const getAllRooms = () => {
  return rooms;
};

export const getRoom = (roomId: string) => {
  return rooms.find((room) => room.roomId === roomId);
};

export const removeRoom = (roomId: string) => {
  const room = rooms.find((room) => room.roomId === roomId);
  if (room) {
    rooms.splice(rooms.indexOf(room), 1);
  }
};
