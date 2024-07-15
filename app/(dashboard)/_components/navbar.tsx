import { EventOptions } from "./event-options";
import { Logout } from "./logout";

export const Navbar = () => {
   return (
      <nav className="w-full bg-white shadow-2xl flex justify-between items-center rounded-xl px-6 py-4">
         <div className="flex items-center gap-x-5">
            <EventOptions />
         </div>
         <div>
            <Logout />
         </div>
      </nav>
   )
};