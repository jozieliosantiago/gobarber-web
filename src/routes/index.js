import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));

export default function Routes() {
  return (
    <Suspense fallback={<h1>LOADING...</h1>}>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
      </Switch>
    </Suspense>
  );
}
