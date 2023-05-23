import { useEffect, useState } from 'react';
import App from './App';
import './main.css';
import React from 'react';

document.title = 'BetterGPT';

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: 'aku',
      password: 'aku',
    },
    {
      username: 'user2',
      password: 'pass2',
    },
  ];

  const handleSubmit = (event: { preventDefault: () => void }) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        alert('Invalid authentication !!');
      } else {
        setIsSubmitted(true);
        document.cookie = "loggedIn=true";
      }
    } else {
      // Username not found
      alert('Invalid authentication !!');
    }
  };
  
  React.useEffect(() => {
    const loggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('loggedIn='));
    if (loggedIn) {
      setIsSubmitted(true);
    }
  }, []);
  // JSX code for login form
  const renderForm = (
    <body className='bg-slate-900'>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-white text-3xl mb-4'>Login</h1>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3'
        >
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>
              Username
            </label>
            <input
              className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              name='uname'
              placeholder='Username'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2'>
              Password
            </label>
            <input
              className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              name='pass'
              placeholder='Password'
            />
          </div>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </body>
  );

  return <div className='app'>{isSubmitted ? <App /> : renderForm}</div>;
}

export default Login;
