import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};

export function Users() {
  //State management
  const [gitUsers, setGitUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();

  const getGitUsers = async () => {
    const response = await axios.get("https://api.github.com/users?since=XXXX");
    console.log(response.data);
    setGitUsers(response.data);
    return response.data;
  };

  useEffect(() => {
    getGitUsers().catch((e) => console.error(e));
  }, []);
  return (
    <div style={{ marginTop: "50px" }}>
      {" "}
      <div className="users-cont">
        {gitUsers.map((user) => (
          <div className="user-card-cont" key={user.id}>
            <img
              src={user.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{user.login}</span>
            <button
              onClick={() => navigate(`/users/user/${user.login}`)}
              className="view-btn"
            >
              View User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}