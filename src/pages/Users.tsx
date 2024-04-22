import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../services/api/useAxios";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};

function Users() {
  const axios = useAxios();
  const navigate = useNavigate();

  const [gitUsers, setGitUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getGitUsers() {
    try {
      setIsLoading(true);
      const users = await axios.get("users", { since: "2016"}, true);
      setGitUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getGitUsers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div >
      <div className="m-20 flex justify-center flex-wrap gap-10">
        {gitUsers?.map((user) => (
          <div 
            key={user.id}
            className="flex w-96 bg-zinc-800 rounded-s-full hover:scale-105 transition duration-200 ease-in-out border-2 border-zinc-800 p-1" 
          >
            <img
              src={user.avatar_url}
              alt="userAvatar"
              className="w-36 h-36 rounded-full"
            />
            <div className="flex flex-col flex-1 items-center justify-center gap-6 ml-4" >
              <span className="text-2xl border-sky-400 font-bold">{user.login}</span>
              <Button
                onClick={() => navigate(`/users/user/${user.login}`)}
                text="View User"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;