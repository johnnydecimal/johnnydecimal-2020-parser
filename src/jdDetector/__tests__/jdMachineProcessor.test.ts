import jdMachineProcessor from '../jdMachineProcessor';
import { validTestJDString, jde12_12 } from '../../data/testJDStrings';

// TODO See if there's a better way than forcing with the bang these tests
//      not to throw TS2532.
test('detects a correct file', () => {
  expect(jdMachineProcessor(validTestJDString).status).toBe('success');
  expect(jdMachineProcessor(validTestJDString).jdArray![1].jdType).toBe(
    'category'
  );
  expect(jdMachineProcessor(validTestJDString).jdArray![5].comment).toBe(
    'which has a comment'
  );
});

test('accepts a blank input', () => {
  // So an empty string is valid JD.
  expect(jdMachineProcessor('').status).toBe('success');
  expect(jdMachineProcessor('').jdArray!.length).toBe(0);
});

test('strips blank lines', () => {
  expect(
    jdMachineProcessor(`10-19 Good area
  
  
  11 Category`).jdArray!.length
  ).toBe(2);
});

// -- Proper tests against errors --------------------------------------------
test('jde12.12', () => {
  expect(jdMachineProcessor(jde12_12).status).toBe('failure');
});
