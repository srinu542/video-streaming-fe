import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicRoute = ( {
  component: Component,
} ) => (
  <Route>
    <Component />
  </Route>
);

PublicRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PublicRoute;
