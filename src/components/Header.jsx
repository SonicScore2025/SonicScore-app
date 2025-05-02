import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header py-6 flex items-center justify-between border-b">
      <h1 className="text-3xl font-extrabold uppercase">Sonic Score</h1>

      <ul className="flex gap-6">
        <li>
          <NavLink to="/">Events</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
