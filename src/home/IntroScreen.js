import React, { Fragment, useState } from 'react';
import fansImage from '../assets/fansImage.png';
import appIcon from '../assets/appIcon.png';
import introImage1 from '../assets/introImage1.png';
import introImage2 from '../assets/introImage2.png';
import introImage3 from '../assets/introImage3.png';
import privacyIcon from '../assets/privacyIcon.png';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import twitter from '../assets/twitter.svg';
import './IntroScreen.css';
import LoginOptionScreen from './LoginOptionScreen';

const IntroScreen = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className='intro-mainContainer'>
      {showLogin ? (
        <LoginOptionScreen setShowLogin={setShowLogin} />
      ) : (
        <Fragment>
          <div className='intro-headerSection'>
            <div className='intro-loginDiv'>
              <button
                className='intro-loginBtn'
                onClick={() => setShowLogin(true)}
              >
                Log In
              </button>
            </div>
            <div className='intro-aboutDiv'>
              <h3 className='intro-aboutHead'>ABOUT US</h3>
              <h1 className='intro-brandName'>Fanstar</h1>
              <p className='intro-aboutContent'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                vitae aliquam platea orci. Et, praesent et lectus justo rutrum
                non.{' '}
              </p>
            </div>
          </div>
          <div className='home-secondSection'>
            <div className='home-secondContent'>
              <h3 className='home-secondHead'>Connect with your fans</h3>
              <p className='home-secondPara'>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
            <div className='home-imageDiv'>
              <img src={introImage1} alt='fans' className='home-image' />
            </div>
          </div>
          <div className='home-thirdSection'>
            <div className='home-thirdContent'>
              <h3 className='home-thirdHead'>Create your own app</h3>
              <p className='home-thirdPara'>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
            <div className='home-imageDiv'>
              <img src={introImage2} alt='app' className='home-image' />
            </div>
          </div>
          <div className='home-secondSection'>
            <div className='home-secondContent'>
              <h3 className='home-secondHead'>Your privacy is our priority</h3>
              <p className='home-secondPara'>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
            <div className='home-imageDiv'>
              <img src={introImage3} alt='privacy' className='home-image' />
            </div>
          </div>
          <div className='home-footerDiv'>
            <div className='home-footer'>
              <h3 className='home-footerHead'>Fanstar</h3>
            </div>
            <div className='home-socialLink'>
              <p className='home-socialPara'>Join us</p>
              <div className='home-socialIconDiv'>
                <img
                  src={facebook}
                  alt='facebook'
                  className='home-socialIcon'
                />
                <img
                  src={instagram}
                  alt='facebook'
                  className='home-socialIcon'
                />
                <img src={twitter} alt='facebook' className='home-socialIcon' />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default IntroScreen;
