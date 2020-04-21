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

import 'semantic-ui-css/semantic.min.css';

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
      })
      .catch((e) => console.error(e));
  }, []);
  // If (user) here -- asynchronously -- then we're logged in.

  return (
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

export default App;
