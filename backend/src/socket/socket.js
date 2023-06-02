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
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
    });

    socket.on("sendNotification", (notification) => {
      const user = getUser(notification.user);
      if (!user) return;
      io.to(user.socketId).emit("getNotification", notification);
    });

    socket.on("sendMessage", (messageData) => {
      const user = getUser(messageData.to);
      if (!user) return;
      console.log("sent Message");
      io.to(user.socketId).emit("getMessage", messageData.message);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};
