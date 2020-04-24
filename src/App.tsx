import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import userbase, { Item, UserResult } from 'userbase-js';

import Account from './account';
import CommandLine from './commandLine/commandLine';
import TextAreaInput from './textAreaInput/textAreaInput';
import RegisterLogin from './account';
import LoggedIn from './LoggedIn';

import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
  const [user, setUser] = useState<UserResult>();

  console.log(`❎ App: user object follows (out)`);
  console.log(user);

  useEffect(() => {
    userbase
      .init({ appId: process.env.REACT_APP_USERBASE_APP_ID as string })
      .then((session) => {
        console.log(`❎ App: user object follows (in)`);
        console.log(session.user);
        session.user && setUser(session.user);
      });
  }, []);

  // const [regForm, setRegForm] = useState<{
  //   username?: string;
  //   password?: string;
  // }>({ username: '', password: '' });
  // const handleRegInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRegForm({ ...regForm, [event.target.name]: event.target.value });
  // };

  // const handleRegSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (regForm.username && regForm.password) {
  //     userbase
  //       .signUp({
  //         username: regForm.username,
  //         password: regForm.password,
  //         rememberMe: 'local',
  //       })
  //       .then((ur: UserResult) => setUser(ur))
  //       .catch((err) => alert(err));
  //   }
  // };

  // const [loginForm, setLoginForm] = useState<{
  //   username?: string;
  //   password?: string;
  // }>({ username: '', password: '' });

  // const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  // };

  // const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (loginForm.username && loginForm.password) {
  //     userbase
  //       .signIn({
  //         username: loginForm.username,
  //         password: loginForm.password,
  //         rememberMe: 'local',
  //       })
  //       .then((ur: UserResult) => setUser(ur))
  //       .catch((err) => alert(err));
  //   }
  // };

  const handleLogout = () => {
    userbase
      .signOut()
      .then(() => setUser(undefined))
      .catch((err) => alert(err));
  };

  // // Store data
  // const DATABASE_NAME = 'blueButton';

  // useEffect(() => {
  //   if (user) {
  //     userbase.openDatabase({ databaseName: DATABASE_NAME, changeHandler });
  //   }
  // }, [user]);

  // const [numClicks, setNumClicks] = useState<number>();

  // const handleBlueButtonClick = () => {
  //   userbase.insertItem({ databaseName: DATABASE_NAME, item: new Date() });
  // };

  // const changeHandler = (items: Item[]) => {
  //   setNumClicks(items.length);
  // };

  return (
    <div style={{ margin: '50px' }}>
      {user ? (
        <LoggedIn handleLogout={handleLogout} user={user} />
      ) : (
        <RegisterLogin setUser={setUser} />
      )}
    </div>
  );
};

/*
const App: React.FC = () => {
  // Very simple: are we logged in? If not, show some login stuff.
  // If so, show the app.

  // Aha, thought of a good compromise to get started. There will be a separate
  // /account page where you log in, log out, etc. ALl done there for now.

  // === Userbase ===
  const [user, setUser] = useState<UserResult>();

  useEffect(() => {
    userbase
      .init({ appId: process.env.REACT_APP_USERBASE_APP_ID as string })
      .then((session) => {
        session.user && setUser(session.user);
        console.log(`❎ App: user object follows within the init`);
        console.log(user);
      })
      .catch((e) => console.error(e));
  }, []);
  // If (user) here -- asynchronously -- then we're logged in.

  console.log(`❎ App: user object follows`);
  console.log(user);

  return (
    <div>Just watch the console</div>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/">
          {user ? (
            // Logged in
            <Container style={{ marginTop: '50px' }}>
              <Header as="h1">Johnny.Decimal</Header>
              <Header as="h2">{user.username}</Header>
              <TextAreaInput />
              <CommandLine />
            </Container>
          ) : (
            // Not logged in
            <Redirect to="/account" />
          )}
        </Route>
      </Switch>
    </Router>
  );
};
*/
export default App;
