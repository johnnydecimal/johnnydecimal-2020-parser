import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import TextAreaInput from './textAreaInput/textAreaInput';
import CommandLine from './commandLine/commandLine';

import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
  // Very simple: are we logged in? If not, show some login stuff.
  // If so, show the app.

  // Aha, thought of a good compromise to get started. There will be a separate
  // /account page where you log in, log out, etc. ALl done there for now.

  return (
    <Container style={{ marginTop: '50px' }}>
      <Header as="h1">Johnny.Decimal</Header>
      <TextAreaInput />
      <CommandLine />
    </Container>
  );
};

export default App;
