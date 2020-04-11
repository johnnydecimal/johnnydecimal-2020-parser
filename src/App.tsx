import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import TextAreaInput from './textAreaInput/textAreaInput';
import CommandLine from './commandLine/commandLine';

import 'semantic-ui-css/semantic.min.css';

const App = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <Header as="h1">Johnny.Decimal</Header>
      <TextAreaInput />
      <CommandLine />
    </Container>
  );
};

export default App;
