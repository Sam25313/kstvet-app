import React from 'react';
import { AdminContext } from 'react-admin';
import authProvider from '../AuthProvider';
import LoginForm from '../LoginForm';

const LoginRoute = () => (
  <AdminContext authProvider={authProvider} >
    <LoginForm />
  </AdminContext>
);

export default LoginRoute;