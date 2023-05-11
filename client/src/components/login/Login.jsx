import React, { useState } from 'react';
import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

import LogoutForm from './LogoutForm';
import LoginForm from './LoginForm';
import { loginUser, registerUser } from '../../api';
import UserIcon from '../UserIcon';

export default function Login() {
  const [logoutDialogIsOpen, setLogoutDialogIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user, token }) => {
      console.log('onSuccess ran after loginMutation succeeded: ', user);
      queryClient.setQueryData(['user'], { ...user, token });
    },
    mutationKey: ['user'],
  });
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ user, token }) => {
      console.log('onSuccess ran after registerMutation succeeded: ', user);
      queryClient.setQueryData(['user'], { ...user, token });
    },
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
        <span className="text-gray-900 dark:text-gray-50 text-sm">User Name</span>
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
              console.warn('login was called but email or password was empty');
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
          logout={() => { console.log('logout was called...')}}
        />
      )}
    </>

  );
};
