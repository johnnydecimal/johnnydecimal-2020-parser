import React from 'react';
import { Button, Container } from 'semantic-ui-react';

import DecimalMachine from './xstate/machine';

import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <Container style={{ marginTop: '50px' }}>
    <Button>I'm a button!</Button>
    <DecimalMachine />
  </Container>
);

export default App;
