//eslint-disable-next-line
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;

  if (profile) {
    //eslint-disable-next-line
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
