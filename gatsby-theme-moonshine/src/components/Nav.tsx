import * as React from "react";
import { Link } from "gatsby";

interface NavProps {
  menuItems: NavItemProps[];
  className?: string;
}

export interface NavItemProps {
  menu: string;
  url: string;
  title: string;
  weight?: number;
}

const Nav: React.FC<NavProps> = ({ menuItems, className }) => {
  const listItems = menuItems.map(menuItem => (
    <li className="nav-item" key={menuItem.title}>
      <Link className="nav-link" to={menuItem.url}>
        <span>{menuItem.title}</span>
      </Link>
    </li>
  ));

  return <ul className={`nav ${className}`}>{listItems}</ul>;
};

export default Nav;
