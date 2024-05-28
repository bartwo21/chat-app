import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLoginOrRegister === "register" ? "/register" : "/login";
    try {
      const { data } = await axios.post(url, {
        username,
        password,
        passwordAgain,
      });
      setLoggedInUsername(username);
      setId(data.id);
      setError("");
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  useEffect(() => {
    setError("");
    setPassword("");
    setPasswordAgain("");
    setUsername("");
  }, [isLoginOrRegister]);
  return (
    <div className="bg-white h-screen flex items-center w-full justify-center relative">
      <h2
        className="
      text-3xl text-green-500 font-semibold text-center absolute md:top-1/4 top-28 w-full
      "
      >
        Welcome to the chat app
      </h2>
      <div className="flex justify-center md:gap-20 md:flex-row flex-col items-center">
        <div className="w-1/2 flex items-center justify-center">
          <img
            className="min-w-[248px]"
            src="signup-image.jpg"
            alt="signup-image.jpg"
          />
        </div>
        <form
          className="w-3/3 md:mx-auto flex flex-col gap-2 justify-center md:min-w-[500px] mx-5"
          onSubmit={handleSubmit}
        >
          {isLoginOrRegister === "register" ? (
            <h1 className="text-2xl mb-4 text-gray-600">Register</h1>
          ) : (
            <h1 className="text-2xl mb-4 text-gray-600">Login</h1>
          )}
          <div className="flex mb-2">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md  dark:text-gray-400 ">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Username"
              className="block w-full rounded-sm p-2 border"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="passwords flex gap-4">
            <div className="flex mb-2 w-full">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md  dark:text-gray-400 ">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>

              <input
                type="password"
                placeholder="Password"
                className="block w-full rounded-sm p-2 border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isLoginOrRegister === "register" && (
              <div className="flex mb-2 w-full">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md  dark:text-gray-400 ">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Password again"
                  className="block w-full rounded-sm p-2 border"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
              </div>
            )}
          </div>
          <button className="bg-green-500 p-2 text-white block w-full rounded-sm hover:bg-green-600 transition-colors">
            {isLoginOrRegister === "register" ? "Register" : "Login"}
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="mt-2">
            {isLoginOrRegister === "register" && (
              <div>
                Already a member?{" "}
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => setIsLoginOrRegister("login")}
                >
                  Login Here
                </button>
              </div>
            )}
            {isLoginOrRegister === "login" && (
              <div>
                Not a member?{" "}
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => setIsLoginOrRegister("register")}
                >
                  Register Here
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
