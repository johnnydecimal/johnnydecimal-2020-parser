import React, { useState } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';

import jdMachineProcessor from '../jdDetector/jdMachineProcessor';
import { validTestJDString } from '../data/testJDStrings';

const TextAreaInput = () => {
  const [formValue, updateForm] = useState(validTestJDString);

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
          style={{ fontFamily: 'Menlo', minHeight: 250 }}
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
