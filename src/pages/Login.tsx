import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

type Props = {
  setIsLogged: (isLogged: boolean) => void;
  setUsername: (username: string) => void;
};

function Login({ setIsLogged, setUsername }: Props) {
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const dummyUserObject = {
    username: "fhalbiero",
    password: "12345",
  };

  function handleLogin() {
    if (
      loginUsername === dummyUserObject.username &&
      password === dummyUserObject.password
    ) {
      setUsername(loginUsername);
      setIsLogged(true);
      navigate("/auth-profile");
    } else {
      setErrorMsg("Invalid Credentials");
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="w-96 flex flex-col gap-2">
        <label htmlFor="username" className="login-label">
          Github username
        </label>
        <input
          type="text"
          name="username"
          value={loginUsername}
          onChange={(e) => {
            setLoginUsername(e.target.value);
            setErrorMsg("");
          }}
          className="text-gray-800 rounded-md focus:outline-none focus:border-sky-400 w-96 h-10 px-4"
          placeholder="username"
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          className="text-gray-800 rounded-md focus:outline-none focus:border-sky-400 w-96 h-10 px-4 mb-8"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg("");
          }}
          placeholder="password"
        />
        <Button text="Login" onClick={handleLogin} />
        <span className="error-span">{errorMsg}</span>
      </div>
    </div>
  );
}

export default Login;