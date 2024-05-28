import axios from "axios";
import { UserContextProvider } from "./contexts/UserContext";
import { Routes } from "./routes/routes";
function App() {
  axios.defaults.baseURL = "https://chat-app-uz21.onrender.com";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
