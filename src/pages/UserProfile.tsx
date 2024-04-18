import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../services/api/useAxios";

type GitUserData = {
  avatar_url: string;
  login: string;
  name: string;
  location: string;
  followers: number;
  following: number;
  html_url: string;
  bio: string;
};

export function UserProfile() {
  const { username } = useParams();
  const axios = useAxios();

  const [gitUserData, setGitUserData] = useState<GitUserData>({});

  useEffect(() => {
    const getGitUser = async () => {
      const user = await axios.get(`users/${username}`);
      setGitUserData(user);
      return user;
    };
    getGitUser().catch((e) => console.error(e));
  }, []);

  return (
    <div className="user-profile-main-cont">
      <div className="top-cont">
        <img
          src={gitUserData.avatar_url}
          className="user-avatar-img"
          alt="user-img"
        />{" "}
        <div className="name-cont">
          <span>{gitUserData.login}</span>
          <h2>{gitUserData.name}</h2>
          <h3>{gitUserData.location}</h3>
          <div className="follow-cont">
            <span className="followers">
              Followers: {gitUserData.followers}
            </span>
            <span>Following: {gitUserData.following}</span>
          </div>
          <a
            className="view-ongit-a"
            href={gitUserData.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div className="bottom-cont">
        <h3>{gitUserData.bio}</h3>
      </div>
    </div>
  );
}