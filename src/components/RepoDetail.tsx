import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../services/api/useAxios";

type GitRepoType = {
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  language: string;
  html_url: string;
  clone_url: string;
};

export function RepoDetail() {
  const axios = useAxios();
  const { name, username } = useParams();

  const [gitRepoData, setGitRepoData] = useState<GitRepoType>();
  const [cloneCopy, setCloneCopy] = useState(false);

  useEffect(() => {
    const getGitUser = async () => {
      const repos = await axios.get(`repos/${username}/${name}`);
      setGitRepoData(repos);
    };
    getGitUser().catch((e) => console.error(e));
  }, [username, name]);
  
  return (
    <div>
      <div className="top-cont">
        {gitRepoData ? (
          <>
            <img
              className="avatar-img"
              src={gitRepoData.owner.avatar_url}
              alt=""
              style={{ width: "30%" }}
            />
            <div className="name-cont">
              <span className="username">
                Owner:{" "}
                <Link to={`/users/user/${gitRepoData.owner.login}`}>
                  {gitRepoData.owner.login}
                </Link>
              </span>
              <span className="repo-lang-span">
                Language: {gitRepoData.language}
              </span>
              <h2>{gitRepoData.name}</h2>
              <div className="follow-cont">
                <a
                  className="view-ongit-a"
                  href={gitRepoData.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
                <div>
                  <input
                    className="clone-url-inp"
                    type="text"
                    value={gitRepoData.clone_url}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(gitRepoData.clone_url);
                      setCloneCopy((isCopied) => !isCopied);
                      setTimeout(
                        () => setCloneCopy((isCopied) => !isCopied),
                        3000
                      );
                    }}
                  >
                    {cloneCopy ? "Copied" : "Clone"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>Loadin...</h1>
        )}
      </div>
    </div>
  );
}