import React from 'react';
import {Link} from "react-router-dom";
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <Link className="logo" to="/">
            <Logo />
            <span>Cinema</span>
          </Link>
          <nav>
            <ul>
              <li><Link to="/">Sessions</Link></li>
              <li><Link to="/upcoming">Upcoming</Link></li>
              <li><Link to="/top-watched">Top watched</Link></li>
            </ul>
            <ul>
              <li><Link to="/sign-in">Sign In</Link></li>
              <li><Link to="/sign-up">Sign Up</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;