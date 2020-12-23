import React from 'react';
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <a className="logo" href="/">
              <Logo/>
              <span>Cinema</span>
          </a>
          <nav>
            <ul>
              <li><a href="#">Sessions</a></li>
              <li><a href="#">Upcoming</a></li>
              <li><a href="#">Top watched</a></li>
            </ul>
            <ul>
              <li><a href="#">SignIn</a></li>
              <li><a href="#">SignUp</a></li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;