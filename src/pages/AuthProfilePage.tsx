import { useEffect, useState } from "react";
import { useAxios } from "../services/api/useAxios";
import { UserProfile } from "../components/UserProfile";

type Props = {
    username: string;
};

type GitUserType = {
    avatar_url: string;
    login: string;
    name: string;
    company: string;
    public_repos: number;
    location: string;
    followers: number;
    following: number;
    html_url: string;
    bio: string;
};

function AuthProfilePage({ username }: Props) {
    const axios = useAxios();

    const [gitUserData, setGitUserData] = useState<GitUserType>();

    useEffect(() => {
        async function getGitUser() {
            try {
                const user = await axios.get(`/users/${username}`);
                setGitUserData(user);
            } catch (error) {
                console.log(error);
            }
        }
        getGitUser();
    }, []);

    if (!gitUserData) return null;

    return (
        <UserProfile userData={gitUserData} isAuth />
    );
}

export default AuthProfilePage;