import { rooms } from '../db/rooms';
import { users } from '../db/users';

export const createRoom = (socketID: string) => {
  const room = rooms.find((room) => room.roomId === socketID);
  if (!room) {
    const user = users.find((user) => user.index === socketID);

    const newRoom = {
      roomId: socketID,
      roomUsers: [
        {
          name: user.name,
          index: user.index,
        },
      ],
    };

    rooms.forEach((room) => {
      if (room.roomUsers.some((user) => user.name === user.name)) {
        room.roomUsers = room.roomUsers.filter((user) => user.name !== user.name);
      }
    });
    rooms.push(newRoom);
  }
};
