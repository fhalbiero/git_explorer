import { useEffect, useState } from "react";
import { useAxios } from "../services/api/useAxios";
import { Link } from "react-router-dom";

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
            <div className="w-72 bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition duration-200 ease-in-out" key={repo.id}>
              <img
                src={repo.owner.avatar_url}
                alt="user Avatar"
                className="w-full object-cover object-center rounded-t-md"
              />
              <div className="p-8 rounded-lg w-full flex flex-col">
                <h2 className="text-xl text-bold text-sky-500">{repo.name}</h2>
                <span className="repo-lang-span">Language: <strong className="text-bold text-sky-400">{repo.language}</strong></span>
                <div>
                  By:{" "}
                  <Link
                    to={`/users/user/${repo.owner.login}`}
                    className="text-bold text-sky-400"
                  >
                    {repo.owner.login}
                  </Link>
                </div>

                <Link 
                  className="text-bold text-sky-400 border-2 border-sky-400 rounded-md p-2 mt-4 text-center hover:bg-sky-400 hover:text-zinc-800" 
                  to={`/repo-detail/${repo.name}/${repo.owner.login}`}
                >
                  View Repo
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <Link className="p-8 float-end text-sky-400" to="/users">{'Go To Users Page >>'}</Link>
    </div>
  );
}
