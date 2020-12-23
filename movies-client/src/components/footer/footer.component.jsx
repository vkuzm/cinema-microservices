import React from 'react';
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
              <p><a href="/">Sessions</a></p>
              <p><a href="/">Upcoming</a></p>
              <p><a href="/">Top Watched</a></p>
              <p><a href="/">Discounts</a></p>
            </div>

            <div className="footer__section">
              <p className="footer__section__heading">Contacts</p>
              <p><a href="/">About us</a></p>
              <p><a href="/">Contacts</a></p>
              <p><a href="/">Partnership</a></p>
            </div>

            <div className="footer__section">
              <p className="footer__section__heading">Account</p>
              <p><a href="/">Sign In</a></p>
              <p><a href="/">Sign Up</a></p>
            </div>

            <div className="footer__section">
              <p className="footer__section__heading">Follow us</p>
              <div className="footer__section">
                <div className="social">
                  <a target="_blank" href="#">
                    <FacebookIcon className="icon" />
                  </a>
                  <a target="_blank" href="#">
                    <InstagramIcon className="icon" />
                  </a>
                  <a target="_blank" href="#">
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