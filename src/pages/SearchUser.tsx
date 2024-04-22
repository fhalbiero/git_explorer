import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../services/api/useAxios";
import { Button } from "../components/Button";

function SearchUser() {
  const axios = useAxios();

  const [username, setUsername] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState("Submit");
  const [attempts, setAttempts] = useState(3);

  const navigate = useNavigate();

  async function handleGetUser() {
    const user = await axios.get(`users/${username}`, undefined, true);
    if (user) {
      navigate(`/users/user/${username}`);
    }
  }

  async function handleSubmit() {
    try {
      setButtonText("Loading...");
      if (username) {
        await handleGetUser()
      }
    } catch (error) {
      setAttempts((currentAttempt) => currentAttempt - 1);
      setErrorMsg(`User Does Not Exist! ${attempts - 1} Attempts remaining`);
    } finally {
      setButtonText("Submit");
    } 
  };
  
  useEffect(() => {
    if (attempts <= 0) {
      setErrorMsg("Too many attempts, Redirecting to Home...");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [attempts, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-6">
      <h3 className="text-4xl">Search User</h3>
      <div className="flex items-center justify-center gap-6">
        <input
          type="text"
          color="primary"
          className="text-gray-800 rounded-md focus:outline-none focus:border-sky-400 w-96 h-10 px-4"
          placeholder="Github Username"
          onChange={(e: any) => {
            setUsername(e.target.value);
            setErrorMsg(null);
          }}
          value={username ? username : ""}
          />
        <Button 
          text={buttonText}
          onClick={handleSubmit}
        />
      </div>
      {errorMsg && (
        <span className="text-red-200 bg-red-700 px-10 py-2 rounded-md">
          {errorMsg}
        </span>
      )}
    </div>
  );
}

export default SearchUser;