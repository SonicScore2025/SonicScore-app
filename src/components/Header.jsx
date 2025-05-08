import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header py-4 md:py-5 border-b border-gray-100 shadow shadow-gray-100">
      <div className="container max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-3xl font-black uppercase text-purple-800">
            Sonic Score
          </h1>
        </Link>

        <ul className="flex gap-10">
          <li>
            <NavLink to="/">Events</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/admin/events">Admin</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
