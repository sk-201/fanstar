import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1 style={{ marginTop: '2rem', width: '100%', textAlign: 'center' }}>
        Error 404 - Page not found
      </h1>
      <div
        style={{
          width: '100%',
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Link
          to='/'
          style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
