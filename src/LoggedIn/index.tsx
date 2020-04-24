import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import userbase, { Item, UserResult } from 'userbase-js';

type Props = {
  user: UserResult;
  handleLogout: any; // Function didn't work?
};

const LoggedIn: React.FC<Props> = ({ user, handleLogout }) => {
  // Store data
  const DATABASE_NAME = 'blueButton';

  useEffect(() => {
    if (user) {
      userbase.openDatabase({ databaseName: DATABASE_NAME, changeHandler });
    }
  }, [user]);

  const [numClicks, setNumClicks] = useState<number>();

  const handleBlueButtonClick = () => {
    userbase.insertItem({ databaseName: DATABASE_NAME, item: new Date() });
  };

  const changeHandler = (items: Item[]) => {
    setNumClicks(items.length);
  };

  return (
    <div>
      <div>
        Signed in as {user.username}.{' '}
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div>
        <h2>Click the blue button</h2>
        <button
          style={{
            fontSize: '25px',
            backgroundColor: 'blue',
            color: 'white',
          }}
          onClick={handleBlueButtonClick}
        >
          The Blue Button
        </button>
        <div style={{ marginTop: '25px' }}>
          You have clicked: {numClicks} times.
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
