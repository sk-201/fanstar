import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroScreen.css';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  return (
    <div className='policy-container'>
      <div className='policy-headerDiv'>
        <h3 className='policy-header'>Privacy Policy</h3>
        <p className='policy-goToHome' onClick={() => navigate('/')}>
          Home
        </p>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Welcome to Fanstar</h3>
        <p className='policy-para'>
          Fanstar is a platform where subscribers can support and engage with
          creators. This privacy policy applies to subscribers, creators, and
          all users of our platform, and is part of our Terms of Use. By using
          our platform, you agree that your personal information that you
          provide directly to us or that we collect through your use of the
          platform, may be transferred to and stored for your safety and handled
          as described in this Policy.
        </p>
      </div>

      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>
          Information You Provide Through Your Account
        </h3>
        <p className='policy-para'>
          {`This is information that you provide to us through text fields, such
          as your name, payment information and benefits. The information we
          collect differs depending on if you make an account, become a
          subscriber, or become a creator. `}
        </p>
        <ul>
          <li>Email address</li>
          <li>Username / Instagram Username</li>
          <li>Mobile Number </li>
          <li>PAN Number </li>
          <li>Aadhaar Number</li>
          <li>Bank Account Details</li>
        </ul>
        <p>
          You may also sign up using a Facebook, Instagram or Google account. We
          will ask permission to access basic information from your Facebook,
          Instagram or Google account, such as your name, email, and profile
          picture. You can choose to stop sharing that information with us at
          any time by going to Facebook or Google to remove Renown’s access to
          that account and your ability to log in.
        </p>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Subscribers or Fans</h3>
        <p className='policy-para'>
          A subscriber is someone who joins Fanstar’s platform to support a
          creator’s content. You may have to make payment on our platform to
          avail the benefits or purchase any services offered by the artist. We
          assure you that the payments get processed by most trusted third party
          payment gateways. We collect and process information about the artists
          you support, the level at which you support them, what benefits you
          receive and how often you support them. As a subscriber, if you select
          a benefit with a physical benefit, then you have to provide your
          shipping information so the creator can ship you the benefit.
        </p>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Creators or Artists</h3>
        <p className='policy-para'>
          A creator is someone who creates and provides content for their
          subscribers through Renown’s platform. To become a creator, you must
          create a page (also called a creator's personal website) that
          describes what you are creating and any benefits you are offering. To
          receive payouts you have to provide us your preferred payment mode
          with your details e.g. UPI / Bank Transfer etc. You must also provide
          us with additional information for tax purposes.
        </p>
        <ul>
          <li>Legal name</li>
          <li> Address Proof</li>
          <li>PAN Card / Aadhar Card</li>
        </ul>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Additional Information We Collect</h3>
        <p className='policy-para'>
          We collect information automatically as you navigate the site or
          through our third party analytics providers. We may store usage
          information such as the type of device you use to access Fanstar, your
          operating system, browser type, IP address, and device ID, the pages
          you visit or request, links clicked, referring sites, user
          interactions and your search terms. We also derive your location from
          your self-disclosed country, your IP address.
        </p>
        <p className='policy-para'>
          We also collect the information from your interaction with our
          platform in terms of user comments, services browsed etc.
        </p>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>How We Use Your Information</h3>
        <p className='policy-para'>We process your information to:</p>
        <ul>
          <li>provide Fanstar services to you</li>
          <li> allow you to sign in to your account</li>
          <li>allow you to join a Fanstar’s membership program on Fanstar</li>
          <li>process a creator’s membership payments</li>
          <li>
            send you emails relevant to your usage, as controlled by your email
            preferences
          </li>
          <li>reply to your questions</li>
          <li>
            understand how you use the service and create better tools for
            creators to serve subscribers
          </li>
          <li>
            conduct research and development to improve Fanstar and develop
            future products
          </li>
          <li>prevent fraud and abuse on Fanstar</li>
          <li>ship merchandise to you if a benefit includes it</li>
          <li>
            allow us to provide you with reasonable accommodation, if you notify
            us of a disability
          </li>
        </ul>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Information Sharing</h3>
        <p className='policy-para'>
          We share the sensitive personal information to any third party without
          obtaining the prior consent of the user in the following limited
          circumstances:
        </p>
        <ul>
          <li>
            When it is requested or required by law or by any court or
            governmental agency or authority to disclose, for the purpose of
            verification of identity, or for the prevention, detection,
            investigation including cyber incidents, or for prosecution and
            punishment of offences. These disclosures are made in good faith and
            belief that such disclosure is reasonably necessary for enforcing
            these Terms; for complying with the applicable laws and regulations.
          </li>

          <li>
            We proposes to share such information within its group companies and
            officers and employees of such group companies for the purpose of
            processing personal information on its behalf. We also ensure that
            these recipients of such information agree to process such
            information based on our instructions and in compliance with this
            Privacy Policy and any other appropriate confidentiality and
            security measures.
          </li>
        </ul>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Information We Share with Creators</h3>
        <p className='policy-para'>
          By becoming a subscriber of an artist, you agree to have the following
          information shared with that artist:
        </p>
        <ul>
          <li>your name and other profile information you’ve provided</li>

          <li>any messages you send creators through Fanstar</li>
          <li>
            some aggregated and anonymized data about how you use Fanstar that
            cannot be linked back to you or to any individual user
          </li>
        </ul>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Information Security</h3>
        <p className='policy-para'>
          We take appropriate security measures to protect against unauthorized
          access to or unauthorized alteration, disclosure or destruction of
          data. These include internal reviews of our data collection, storage
          and processing practices and security measures, including appropriate
          encryption and physical security measures to guard against
          unauthorized access to systems where we store personal data.
        </p>
        <p className='policy-para'>
          All information gathered on our Website is securely stored within our
          controlled database. The database is stored on servers secured behind
          a firewall; access to the servers is password-protected and is
          strictly limited. However, as effective as our security measures are,
          no security system is impenetrable. We cannot guarantee the security
          of our database, nor can we guarantee that information you supply will
          not be intercepted while being transmitted to us over the Internet.
          And, of course, any information you include in a posting to the
          discussion areas is available to anyone with Internet access.
        </p>
        <p className='policy-para'>
          However the internet is an ever evolving medium. We may change our
          Privacy Policy from time to time to incorporate necessary future
          changes. Of course, our use of any information we gather will always
          be consistent with the policy under which the information was
          collected, regardless of what the new policy may be.
        </p>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Cookies</h3>
        <p className='policy-para'>
          To improve the responsiveness of the sites for our users, we may use
          "cookies", or similar electronic tools to collect information to
          assign each visitor a unique, random number as a User Identification
          (User ID) to understand the user's individual interests using the
          Identified Computer. Unless you voluntarily identify yourself (through
          registration, for example), we will have no way of knowing who you
          are, even if we assign a cookie to your computer. The only personal
          information a cookie can contain is information you supply (an example
          of this is when you ask for our Personalised Horoscope). A cookie
          cannot read data off your hard drive. Our advertisers may also assign
          their own cookies to your browser (if you click on their ads), a
          process that we do not control.
        </p>
        <p className='policy-para'>
          Our web servers automatically collect limited information about your
          computer's connection to the Internet, including your IP address, when
          you visit our site. (Your IP address is a number that lets computers
          attached to the Internet know where to send you data -- such as the
          web pages you view.) Your IP address does not identify you personally.
          We use this information to deliver our web pages to you upon request,
          to tailor our site to the interests of our users, to measure traffic
          within our site and let advertisers know the geographic locations from
          where our visitors come.
        </p>
      </div>
      <div className='policy-contentDiv'>
        <h3 className='policy-heading'>Grievance Redressal</h3>
        <p className='policy-para'>
          Redressal Mechanism: Any complaints, abuse or concerns with regards to
          content and or comment or breach of these terms shall be immediately
          informed to the designated Grievance Officer as mentioned below via in
          writing or through email signed with the electronic signature to the
          “Grievance Officer”
        </p>
      </div>
      <div className='policy-contentDiv'>
        <p className='policy-para contactDetails'>
          Mr. Akash <a href='https://fanstar.app'>https://fanstar.app</a>
        </p>
        <p className='policy-para contactDetails'>
          A7, Chhatarpur Enclave, Phase 2 Delhi, India, New Delhi 110074
        </p>
        <p className='policy-para contactDetails'>Email: support@fanstar.app</p>

        <p className='policy-para contactDetails'>Ph: +91-9625103622</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
