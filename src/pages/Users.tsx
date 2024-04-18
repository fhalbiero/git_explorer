import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../services/api/useAxios";

type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};

export function Users() {
  const axios = useAxios();
  const navigate = useNavigate();

  const [gitUsers, setGitUsers] = useState<UserType[]>([]);

  async function getGitUsers() {
    const users = await axios.get("users", { since: "XXXX"});
    setGitUsers(users);
  }

  useEffect(() => {
    getGitUsers().catch((e) => console.error(e));
  }, []);
  
  return (
    <div >
      <div className="m-20 flex justify-center flex-wrap gap-10">
        {gitUsers.map((user) => (
          <div className="flex w-72 bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition duration-200 ease-in-out" key={user.id}>
            <img
              src={user.avatar_url}
              alt="userAvatar"
              className="w-40 h-40 rounded-full"
            />
            <div>
              <span className="text-">{user.login}</span>
              <button
                onClick={() => navigate(`/users/user/${user.login}`)}
                className="view-btn"
              >
                View User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}