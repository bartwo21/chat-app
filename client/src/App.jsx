import axios from "axios";
import { UserContextProvider } from "./contexts/UserContext";
import { Routes } from "./routes/routes";
function App() {
  axios.defaults.baseURL = "https://chat-app-api-two-black.vercel.app";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
