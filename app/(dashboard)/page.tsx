import { Navbar } from "./_components/navbar";
import { UserEventList } from "./_components/user-event-list";

const Dashboard = () => {
   return (
      <div className="flex flex-col gap-20 max-w-[85%] mx-auto h-full">
         <Navbar />
         <UserEventList />
      </div>
   )
};

export default Dashboard;