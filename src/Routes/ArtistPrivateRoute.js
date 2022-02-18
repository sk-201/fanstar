import React from 'react';
import { Route, Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';

const ArtistPrivateRoute = (props) => {
  const { path, Component } = props;
  const token = localStorage.getItem('fanstarToken');
  const currentTime = Date.now() / 1000;
  // console.log(currentTime);
  if (token) {
    // console.log(isLoggedIn);
    if (jwt_decode(token).exp > currentTime) {
      return (
        <Route
          path={path}
          render={(props) => {
            return <Component {...props} />;
          }}
        />
      );
    } else {
      alert('Session Expired! Please login again');
      localStorage.removeItem('fanstarToken');
      return (
        <Route
          path={path}
          render={() => {
            return <Redirect to={{ pathname: '/', state: { from: path } }} />;
          }}
        />
      );
    }
  } else {
    return (
      <Route
        path={path}
        render={() => {
          return <Redirect to={{ pathname: '/', state: { from: path } }} />;
        }}
      />
    );
  }
};

export default ArtistPrivateRoute;
