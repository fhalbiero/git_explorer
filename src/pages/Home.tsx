import { useEffect, useState } from "react";
import { useAxios } from "../services/api/useAxios";
import { Link } from "react-router-dom";
import { Repo } from "../components/Repo";
import { Loading } from "../components/Loading";

type GitRepoType = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  language: string;
};

function Home() {
  const axios = useAxios();

  const [repos, setRepos] = useState<GitRepoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function gitRepos() {
    try {
      setIsLoading(true);
      const repos = await axios.get("search/repositories", { q: "react"} );
      if (repos.items.length > 0) {
        setRepos(repos.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    gitRepos();      
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-center flex-wrap gap-20 p-20 m-auto">
        {repos?.map( repo => (
            <Repo 
              key={repo.id} 
              id={repo.id} 
              name={repo.name} 
              login={repo.owner.login} 
              avatar_url={repo.owner.avatar_url} 
              language={repo.language}
            />
          ))
        }
      </div>
      <Link className="p-8 float-end text-sky-400" to="/users">{'Go To Users Page >>'}</Link>
    </div>
  );
}

export default Home;