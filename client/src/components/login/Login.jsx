import React, { useState } from 'react';
import {
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';

import LogoutForm from './LogoutForm';
import LoginForm from './LoginForm';
import { loginUser, registerUser } from '../../api';
import UserIcon from '../UserIcon';

export default function Login() {
  const [logoutDialogIsOpen, setLogoutDialogIsOpen] = useState(false);
  const queryClient = useQueryClient();
  function setUser({ user, token }) {
    queryClient.setQueryData(['user'], { ...user, token });
  }
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: setUser,
    mutationKey: ['user'],
  });
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: setUser,
    mutationKey: ['user'],
  });
  const user = queryClient.getQueryData(['user']);
  console.log('user:  ', user);
  const userButtonClasses = 'min-h-full flex flex-col items-center justify-center' +
    ' py-2 px-6 lg:px-8 bg-gray-200 hover:bg-gray-300 rounded' +
    ' dark:bg-gray-700 dark:hover:bg-gray-600';
  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log('user clicked');
          setLogoutDialogIsOpen(true);
        }}
        className={userButtonClasses}
      >
        <UserIcon />
        <span className="text-gray-900 dark:text-gray-50 text-sm">
          {user?.email || '???'}
        </span>
      </button>
      { !user && (
        <LoginForm
          close={() => setLogoutDialogIsOpen(false)}
          login={(credentials) => {
            console.log('login was called... widht credentials:  ', credentials);
            const { email, password } = credentials;
            if (email && password) {
              loginMutation.mutate(credentials);
            } else {
              alert('email and password are required in order to login!');
            }
          }}
          register={(credentials) => {
            console.log('register was called... widht credentials:  ', credentials);
            registerMutation.mutate(credentials);
          }}
        />
      )}
      { logoutDialogIsOpen && (
        <LogoutForm
          isOpen={logoutDialogIsOpen}
          setIsOpen={setLogoutDialogIsOpen}
          logout={() => { queryClient.setQueryData(['user'], null);}}
        />
      )}
    </>

  );
};
