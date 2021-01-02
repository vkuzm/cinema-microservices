import React from 'react';
import {Link} from "react-router-dom";
import './footer.styles.scss';
import { ReactComponent as FacebookIcon } from '../../assets/soc-fb.svg';
import { ReactComponent as InstagramIcon } from '../../assets/soc-inst.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/soc-yt.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">

        <div className="footer__top">
          <div className="footer__box">
            <div className="footer__section">
              <p className="footer__section__heading">Cinema</p>
              <p><Link to="/">Sessions</Link></p>
              <p><Link to="/upcoming">Upcoming</Link></p>
              <p><Link to="/top-watched">Top Watched</Link></p>
              <p><Link to="/discounts">Discounts</Link></p>
            </div>

            <div className="footer__section">
              <p className="footer__section__heading">Contacts</p>
              <p><Link to="/">About us</Link></p>
              <p><Link to="/">Contacts</Link></p>
              <p><Link to="/">Partnership</Link></p>
            </div>

            <div className="footer__section">
              <p className="footer__section__heading">Account</p>
              <p><Link to="/sign-in">Sign In</Link></p>
              <p><Link to="/sign-up">Sign Up</Link></p>
            </div>

            <div className="footer__section">
              <p className="footer__section__heading">Follow us</p>
              <div className="footer__section">
                <div className="social">
                  <a target="_blank" href="/">
                    <FacebookIcon className="icon" />
                  </a>
                  <a target="_blank" href="/">
                    <InstagramIcon className="icon" />
                  </a>
                  <a target="_blank" href="/">
                    <YoutubeIcon className="icon yt-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="footer__bottom">
            <div className="footer__copyright">
              <p>©2077 All right reserved</p>
            </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;