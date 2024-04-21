import { Link } from "react-router-dom";

type RepoProps = {
    id: number;
    name: string;
    login: string;
    avatar_url: string;
    language: string;
};

export function Repo({ id, name, login, avatar_url, language }: RepoProps) {
  return (
    <div 
        key={id}
        className="w-72 bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition duration-200 ease-in-out" 
    >
        <img
        src={avatar_url}
        alt="user Avatar"
        className="w-full object-cover object-center rounded-t-md"
        />
        <div className="p-8 rounded-lg w-full flex flex-col">
        <h2 className="text-xl text-bold text-sky-400">{name}</h2>
        <span className="repo-lang-span">Language: <strong className="text-bold text-sky-400">{language}</strong></span>
        <div>
            By:{" "}
            <Link
            to={`/users/user/${login}`}
            className="text-bold text-sky-400"
            >
            {login}
            </Link>
        </div>

        <Link 
            className="text-bold text-sky-400 border-2 border-sky-400 rounded-md p-2 mt-4 text-center hover:bg-sky-400 hover:text-zinc-800" 
            to={`/repo-detail/${name}/${login}`}
        >
            View Repo
        </Link>
        </div>
    </div>
  );
}