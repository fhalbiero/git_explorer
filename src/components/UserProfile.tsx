
type Props = {
  userData: {
    avatar_url: string;
    login: string;
    name: string;
    location: string;
    followers: number;
    following: number;
    html_url: string;
    bio: string;
    company?: string;
    public_repos?: number;
  },
  isAuth?: boolean;
};

export function UserProfile({ userData, isAuth }: Props) {

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex justify-center items-center gap-10" style={{ width: 760, height: 520 }}>
        <img
          src={userData.avatar_url}
          className={isAuth ? "w-72 h-72 rounded-full" : "w-52 h-52 rounded-full"}
          alt="user avatar"
        />
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-3xl mt-4">{userData.name}</h2>
          <span className="text-xl text-sky-400">{userData.login}</span>
          <h3>{userData.location}</h3>
          {isAuth && (
                <span className="block">
                    Company:{" "}
                    <span className="text-xl text-sky-400">
                        {userData?.company}
                    </span>
                </span>
          )}
          {isAuth && <span>Public Repos: <strong>{userData?.public_repos}</strong></span>}
          <div className="flex gap-6">
            <span className="followers">
              Followers: <strong>{userData.followers}</strong>
            </span>
            <span>Following: <strong>{userData.following}</strong></span>
          </div>
          <p className="text-gray-300">{userData.bio}</p>
          <a
            className="mt-6 text-bold text-sky-400 border-2 border-sky-400 rounded-md px-8 py-2 text-center hover:bg-sky-400 hover:text-zinc-800"
            href={userData.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}