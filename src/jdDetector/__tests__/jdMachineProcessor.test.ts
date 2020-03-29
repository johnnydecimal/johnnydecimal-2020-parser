import jdMachineProcessor from '../jdMachineProcessor';
import testJDString from '../../data/testJDString';

// TODO See if there's a better way than forcing with the bang these tests
//      not to throw TS2532.
test('detects a correct file', () => {
  expect(jdMachineProcessor(testJDString).status).toBe('success');
  expect(jdMachineProcessor(testJDString).jdArray![1].jdType).toBe('category');
  expect(jdMachineProcessor(testJDString).jdArray![5].comment).toBe(
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

// TODO these tests are weak.
// "The leads are weak!"
test('fails if area order is incorrect', () => {
  expect(
    jdMachineProcessor(`10-19 first
  20-29 second
  00-09 third`).status
  ).toBe('failure');

  expect(
    jdMachineProcessor(`10-19 area
  12 category
  11 category`).status
  ).toBe('failure');
});
