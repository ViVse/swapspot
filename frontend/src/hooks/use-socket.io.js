import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const useSocketIo = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const connect = io.connect(process.env.REACT_APP_SERVER_URL);
    setSocket(connect);
  }, []);
  return { socket };
};

export default useSocketIo;
