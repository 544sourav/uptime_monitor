import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { socket } from "../service/socket";

export function useSocketAuth(){
    const {getToken,isSignedIn} = useAuth();
    useEffect(() => {
      if (!isSignedIn) return;
      const connectSocket = async () => {
        const token = await getToken();
        socket.auth = { token };
        socket.connect();
      };
      connectSocket();

      return ()=>{
        socket.disconnect();
      }
    }, [isSignedIn, getToken]);
}