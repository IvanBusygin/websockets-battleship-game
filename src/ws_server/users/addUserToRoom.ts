import { getUser } from '../db/users';
import { getRoom, rooms } from '../db/rooms';
import { consoleColors } from '../utils/const';

export const addUserToRoom = (roomId: string, socketID: string) => {
  const currentUser = getUser(socketID);
  const roomToAdd = getRoom(roomId);

  if (!currentUser || !roomToAdd) {
    console.log(consoleColors.red, 'Player or room not found. Add user to room now.');
    return;
  }

  if (roomToAdd.roomUsers.some((user) => user.index === currentUser.index)) {
    console.log(consoleColors.turquoise, 'Player in the room now.');
    return;
  }

  rooms.forEach((room) => {
    if (room.roomUsers.some((user) => user.index === currentUser.index)) {
      room.roomUsers = room.roomUsers.filter((user) => user.index !== currentUser.index);
    }
  });

  roomToAdd.roomUsers.push({
    name: currentUser.name,
    index: currentUser.index,
  });
};
