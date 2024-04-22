import { Link } from "react-router-dom";

type Props = {
  isLogged: boolean;
};

export function Navbar({ isLogged }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-24 flex justify-between items-center px-20 bg-inherit">
      <Link className="text-2xl text-sky-300" to={"/"}>
        Git Explorer
      </Link>
      <div className="flex justify-between gap-6">
        <Link className="hover:text-sky-400" to={"/"}>Repos</Link>
        <Link className="hover:text-sky-400" to={"/users"}>Users</Link>
        <Link className="hover:text-sky-400" to={"/search"}>Search</Link>
        <Link className="hover:text-sky-400" to={"/auth-profile"}>Profile</Link>
        <a className="hover:text-sky-400" href="https://fabioalbiero.com">About me</a>
        {!isLogged && <Link className="hover:text-sky-400" to={"/login"}>Login</Link>}
      </div>
    </nav>
  );
}