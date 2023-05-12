import React, { useState } from 'react';

import petsLogo from '../../assets/pets-logo.jpeg';

export default function LoginForm({ login, register, close }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 overflow-y-auto flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="m-w-[300px] bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center p-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src={petsLogo} alt="logo" />
              Pets (Sample App)    
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  { isRegister ? 'Register' : 'Sign in to' } your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    if (isRegister) register({ email, password });
                    else login({ email, password });
                    
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  { isRegister ? 'Register' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => close()}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                { isRegister ? 'Already have an account?' : 'Don’t have an account yet?' }
                <a 
                  href="#"
                  className="center-text w-full text-center"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  <span className="text-blue-500 dark:text-blue-600 float-right hover:underline">
                    { isRegister ? 'Go to Login' : 'Sign up' }
                  </span>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}