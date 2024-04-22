import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../services/api/useAxios";
import { UserProfile } from "../components/UserProfile";

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

function UserProfilePage() {
  const { username } = useParams();
  const axios = useAxios();

  const [gitUserData, setGitUserData] = useState<GitUserData>();

  useEffect(() => {
    const getGitUser = async () => {
      const user = await axios.get(`users/${username}`);
      setGitUserData(user);
      return user;
    };
    getGitUser().catch((e) => console.error(e));
  }, []);

  if (!gitUserData) return null;

  return (
    <UserProfile userData={gitUserData} />
  );
}

export default UserProfilePage;