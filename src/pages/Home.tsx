import { useEffect, useState } from "react";
import { useAxios } from "../services/api/useAxios";
import { Link } from "react-router-dom";
import { Repo } from "../components/Repo";

type GitRepoType = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  language: string;
};

export function Home() {
  const axios = useAxios();

  const [repos, setRepos] = useState<GitRepoType[]>([]);

  async function gitRepos() {
    const repos = await axios.get("search/repositories", { q: "X"} );
    setRepos(repos.items);
  }

  useEffect(() => {
    gitRepos().catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center flex-wrap gap-20 p-20 m-auto">
        {repos ? (
          repos.map( repo => (
            <Repo 
              key={repo.id} 
              id={repo.id} 
              name={repo.name} 
              login={repo.owner.login} 
              avatar_url={repo.owner.avatar_url} 
              language={repo.language}
            />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <Link className="p-8 float-end text-sky-400" to="/users">{'Go To Users Page >>'}</Link>
    </div>
  );
}
