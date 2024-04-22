import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

type Props = {
  isLogged: boolean;
};

export function Layout({ isLogged }: Props) {

  return (
    <div className="bg-zinc-900 text-gray-200 h-screen w-screen overflow-hidden">
      <Navbar isLogged={isLogged} />
      <div 
        className="bg-zinc-700 text-gray-200 w-screen mt-24 overflow-y-auto flex flex-col items-center gap-10" 
        style={{ 
          height: 'calc(100vh - 96px)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#83858a #262727', 
        }}>
          <Outlet />
      </div>
    </div>
  );
}