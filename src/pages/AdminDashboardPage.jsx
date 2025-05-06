import { Link, NavLink, Outlet } from "react-router-dom";
import AdminEventsListPage from "./AdminEventListPage";
import { CalendarHeart, Star } from "@phosphor-icons/react";

const AdminDashboardPage = () => {
  return (
    <div
      className="flex flex-wrap md:flex-nowrap gap-5 md:gap-0"
      id="adminPage"
    >
      <div className="w-full md:w-2/10">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink to={"/admin/events"} className="gap-2">
              <CalendarHeart size={24} weight="duotone" />
              List of Events
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/reviews"} className="gap-2">
              <Star size={24} weight="duotone" />
              List of Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-8/10 md:border-l-2 border-gray-100 md:pl-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
