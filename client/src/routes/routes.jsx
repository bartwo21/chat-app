import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Register from "../pages/RegisterAndLogin";
import Chat from "../pages/Chat";

export const Routes = () => {
  const { username, id } = useContext(UserContext);
  if (username) {
    return <Chat />;
  }
  return <Register />;
};
