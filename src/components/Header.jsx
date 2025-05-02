import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>Header</h1>

      <ul>
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
