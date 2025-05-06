import { Link, NavLink, Outlet } from "react-router-dom";
import AdminEventsListPage from "./AdminEventListPage";

const AdminDashboardPage = () => {
  return (
    <div className="flex" id="adminPage">
      <div className="w-2/10">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink to={"/admin/events"}>List of Events</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/reviews"}>List of Reviews</NavLink>
          </li>
        </ul>
      </div>
      <div className="w-8/10 border-l-2 border-gray-100 pl-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
