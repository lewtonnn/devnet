import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.isAuthenticated);

  return (
      <Route
          {...rest}
          render={(props) =>
              !isAuthenticated && !loading ? (
                  <Redirect to='/login'/>
              ) : (
                  <Component {...props} />
              )
          }
      />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
