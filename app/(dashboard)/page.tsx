import { Navbar } from "./_components/navbar";
import { UserEventList } from "./_components/user-event-list";

const Dashboard = () => {
   return (
      <div className="flex-1 space-y-20 max-w-[85%] mx-auto">
         <Navbar />
         <UserEventList />
      </div>
   )
};

export default Dashboard;