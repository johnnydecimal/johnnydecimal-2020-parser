import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import userbase, { Item, UserResult } from 'userbase-js';

type Props = {
  setUser: Function;
  loginStateSend: Function;
};

const RegisterLogin: React.FC<Props> = ({ setUser, loginStateSend }) => {
  const [regForm, setRegForm] = useState<{
    username?: string;
    password?: string;
  }>({ username: '', password: '' });
  const handleRegInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegForm({ ...regForm, [event.target.name]: event.target.value });
  };

  const handleRegSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (regForm.username && regForm.password) {
      console.log('sending LOGGING_IN');
      loginStateSend('LOGGING_IN');
      userbase
        .signUp({
          username: regForm.username,
          password: regForm.password,
          rememberMe: 'local',
        })
        .then((ur: UserResult) => setUser(ur))
        .catch((err) => alert(err));
    }
  };

  const [loginForm, setLoginForm] = useState<{
    username?: string;
    password?: string;
  }>({ username: '', password: '' });

  const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginForm.username && loginForm.password) {
      loginStateSend('TRYING_LOGIN');
      userbase
        .signIn({
          username: loginForm.username,
          password: loginForm.password,
          rememberMe: 'local',
        })
        .then((ur: UserResult) => {
          setUser(ur);
          loginStateSend('LOGIN_SUCCESS');
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={regForm?.username}
            onChange={handleRegInputChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={regForm?.password}
            onChange={handleRegInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <h2>Log in</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={loginForm?.username}
            onChange={handleLoginInputChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginForm?.password}
            onChange={handleLoginInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegisterLogin;
