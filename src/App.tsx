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
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

import Account from './account';
import CommandLine from './commandLine/commandLine';
import TextAreaInput from './textAreaInput/textAreaInput';
import RegisterLogin from './account';
import LoggedIn from './LoggedIn';

import 'semantic-ui-css/semantic.min.css';

const loginStateMachine = Machine({
  id: 'loginState',
  initial: 'pageLoad',
  states: {
    pageLoad: {
      on: {
        LOGGED_IN: 'loggedIn',
        NOT_LOGGED_IN: 'notLoggedIn',
      },
    },
    notLoggedIn: {
      on: {
        TRYING_LOGIN: 'tryingLogin',
      },
    },
    tryingLogin: {
      on: {
        LOGIN_SUCCESS: 'loggedIn',
        LOGIN_FAILURE: 'notLoggedIn',
      },
    },
    loggedIn: {
      on: {
        LOGGED_OUT: 'notLoggedIn',
        LOGOUT_FAILURE: 'loggedIn',
      },
    },
    loggedOut: {
      entry: () => {
        console.log('👔 Entered the loggedOut state.');
      },
    },
  },
});

const App: React.FC = () => {
  const [user, setUser] = useState<UserResult>();
  const [loginState, loginStateSend] = useMachine(loginStateMachine);
  // debugger;

  console.log(`loginState: ${loginState.value}`);
  console.log(`user.username: ${user?.username}`);

  useEffect(() => {
    userbase
      .init({ appId: process.env.REACT_APP_USERBASE_APP_ID as string })
      .then((session) => {
        if (session.user) {
          setUser(session.user);
          loginStateSend('LOGGED_IN');
        } else {
          loginStateSend('NOT_LOGGED_IN');
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleLogout = () => {
    userbase
      .signOut()
      .then(() => {
        loginStateSend('LOGGED_OUT');
        setUser(undefined);
      })
      .catch((err) => {
        loginStateSend('LOGOUT_FAILURE');
        alert(err);
      });
  };

  return (
    <div style={{ margin: '50px' }}>
      {(() => {
        switch (loginState.value) {
          case 'pageLoad':
            return <div>Figuring out if you're logged in...</div>;
          case 'notLoggedIn':
            return (
              <RegisterLogin
                setUser={setUser}
                loginStateSend={loginStateSend}
              />
            );
          case 'tryingLogin':
            return <div>tryingLogIn</div>;
          case 'loggedIn':
            return <LoggedIn handleLogout={handleLogout} user={user} />;
          case 'loggedOut':
            return <div>loggedOut</div>;
          default:
            return null;
        }
      })()}

      {/* {loginState.value === 'loggedIn' ? (
      ) : (
        <RegisterLogin setUser={setUser} />
      )} */}
    </div>
  );
};

export default App;
