import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../services/api/useAxios";

export function SearchUser() {
  const axios = useAxios();

  const [username, setUsername] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState("Submit");
  const [attempts, setAttempts] = useState(3);

  const navigate = useNavigate();

  async function handleGetUser() {
    const user = await axios.get(`users/${username}`);
    if (user) {
      navigate(`/users/user/${username}`);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Loading...");
    if (username) {
      handleGetUser().catch(() => {
        setLoading("Submit");
        setAttempts((currentAttempt) => currentAttempt - 1);
        setErrorMsg(`User Does Not Exist! ${attempts - 1} Attempts remaining`);
      });
    }
  };
  
  useEffect(() => {
    if (attempts <= 0) {
      setErrorMsg("Too many attempts, REDIRECTING...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [attempts, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-6">
      <h3 className="">Search User</h3>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        {errorMsg && (
          <span className="">
            {" "}
            {errorMsg}
          </span>
        )}
        <input
          type="text"
          placeholder="Github Surname"
          className="login-inp"
          onChange={(e: any) => {
            setUsername(e.target.value);
            setErrorMsg(null);
          }}
          value={username ? username : ""}
        />
        <button type="submit" className="login-submit-btn">
          {loading}
        </button>
      </form>
    </div>
  );
}