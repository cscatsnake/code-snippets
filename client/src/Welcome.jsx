import React from 'react';

const Welcome = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    console.log(username);
    console.log(password);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log('hello');
        console.log('You loggedin', user);
        //   setLoggedIn(user);
      })
      .catch((err) =>
        console.log('error from Login-Post-Request ERROR: ', err)
      );
  };

  const inputChange = () => {
    console.log('its changing');
  };

  return (
    <div>
      <h1>Code Snippets</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Username </label>
          <input
            type='text'
            name='username'
            className='login__input'
            // onChange={inputChange}
            required
            autoComplete='off'
          />
        </div>
        <div className='input-container'>
          <label>Password </label>
          <input
            type='password'
            name='pword'
            className='login__input'
            // onChange={inputChange}
            required
            autoComplete='off'
          />
        </div>
        <button type='submit' className='btn btn--popup'>
          Login
        </button>
      </form>
      <h2>
        Not a member? <a href='/'>Sign up</a>
      </h2>
    </div>
  );
};

export default Welcome;
