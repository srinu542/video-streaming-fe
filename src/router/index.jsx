import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import publicRoutes from './routes';
import PublicRoute from './public-route';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {publicRoutes.map( ( {
        key, exact, path, component,
      } ) => (
        <PublicRoute
          key={ key }
          exact={ exact }
          path={ path }
          component={ component }
        />
      ) )}
    </Switch>
  </BrowserRouter>
);

export default Router;
