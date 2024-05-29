import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const [loading, setLoading] = useState(false);
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 2500);
    } finally {
      setLoading(false);
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
          <button
            className={
              " p-2 text-white block w-full rounded-sm transition-colors" +
              (loading
                ? " cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                : " bg-green-500 hover:bg-green-600")
            }
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-300 fill-green-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : isLoginOrRegister === "register" ? (
              "Register"
            ) : (
              "Login"
            )}
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
