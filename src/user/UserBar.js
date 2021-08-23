import React, { useContext } from 'react';
import { StateContext } from '../contexts';

import Login from './Login';
import Register from './Register';

const Logout = React.lazy(() => import('./Logout')); // the import dynamically loads the logout and the component only gets called when triggered by React.lazy

export default function UserBar () {
  const { state } = useContext(StateContext)
  const { user } = state
    if (user) {
      return <Logout />
    } else {
      return (
          <React.Fragment>
              <Login />
              <Register />
          </React.Fragment>
      )
    }
  }