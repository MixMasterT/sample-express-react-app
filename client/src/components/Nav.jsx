import React from 'react';
// import { Link } from 'react-router-dom';
import petsLogo from '../assets/pets-logo.jpeg';
import Login from './login/Login';

export default function Nav() {
  // const linkClass = 'text-white hover:text-purple-300 active:outline-blue focus:ring-2 focus:ring-inset focus:ring-white px-3 py-2 rounded-md text-sm font-medium';
  const linkClasses = 'block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50';
  return (
    <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <span className="flex items-center">
          <img src={petsLogo} className="mr-3 h-6 sm:h-9" alt="Pets Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pets</span>
        </span>
        <Login />
      </div>
    </nav>
  );
}