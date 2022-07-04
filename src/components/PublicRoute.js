import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container, Loader } from 'react-dom';
import { useProfile } from '../context/profile.context';

const PublicRoute = ({ children, ...routeProps }) => {
  const {profile} = useProfile();


  if(isLoading && !profile){
    return <Container>
      <Loader center vertical size="md" content="Loading" speed="slow" />
    </Container>
  }

  if (profile && !isLoading) {
    return <Redirect to="/signin" />;
  }

  if (profile) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
