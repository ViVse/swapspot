let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export default (io) => {
  io.on("connection", (socket) => {
    //when connected
    console.log("a user connected.");

    socket.on("addUser", (userId) => {
      console.log(`added ${userId}`);
      addUser(userId, socket.id);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};
