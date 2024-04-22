import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-screen h-screen bg-zinc-700 flex flex-col items-center justify-center">
      <h1 className="text-gray-300 text-6xl font-bold">Page Not Found</h1>
      <Link 
        className="mt-12 text-bold text-sky-400 border-2 border-sky-400 rounded-md px-8 py-2 text-center hover:bg-sky-400 hover:text-zinc-800" 
        to="/"
      >
        Go Back To Home Page
      </Link>
    </div>
  );
}

export default NotFound;