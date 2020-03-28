import React, { useState } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';

import jdMachineProcessor from '../jdDetector/jdMachineProcessor';
import testJDString from '../data/testJDString';

const TextAreaInput = () => {
  const [formValue, updateForm] = useState(testJDString);

  const formOnChange = (e: any) => {
    updateForm(e.target.value);
  };

  const buttonOnClick = (e: any) => {
    const result = jdMachineProcessor(formValue);
    console.log(result);
  };

  return (
    <>
      <Form>
        <TextArea
          onChange={formOnChange}
          placeholder="Type your JD here"
          style={{ fontFamily: 'Menlo', minHeight: 300 }}
          value={formValue}
        />
      </Form>
      <p />
      <Button color="red" onClick={buttonOnClick}>
        Execute
      </Button>
    </>
  );
};

export default TextAreaInput;
