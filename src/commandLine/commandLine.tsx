import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';

const CommandLine = () => {
  // So what does it do?
  // You need some state
  const [inputValue, updateInput] = useState('');
  const inputOnChange = (e: any) => {
    updateInput(e.target.value);
  };
  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      console.log('Bingo');
    }
  };
  // You need an input box
  return (
    <div
      className="red-border"
      style={{ margin: '20px 0 20px 0', width: '400px' }}
    >
      <Input
        className="testclass"
        fluid
        onChange={inputOnChange}
        onKeyDown={onKeyDown}
        placeholder="> "
        value={inputValue}
      />
    </div>
  );
};

export default CommandLine;
