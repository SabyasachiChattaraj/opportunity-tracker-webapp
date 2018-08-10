import * as React from 'react';
import { BrowserRouter as Router,Route, Redirect } from 'react-router-dom';
import {getLoggedInUser,getLoggedInUserId,isLoggedIn}  from './CommonUtility';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
  export default PrivateRoute;