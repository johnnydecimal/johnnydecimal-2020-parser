import jdMachineProcessor from '../jdMachineProcessor';
import {
  validTestJDString,
  jderr12_12,
  jderr12_13,
  jderr12_14,
  jderr13_13,
  jderr13_14,
  jderr14_14,
  jderr23_22,
  jderr24_23,
} from '../../data/testJDStrings';

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
test('JDERR12.12', () => {
  expect(jdMachineProcessor(jderr12_12).status).toBe('error');
  expect(jdMachineProcessor(jderr12_12).error).toBe('JDE12.12');
});

test('JDERR12.13', () => {
  expect(jdMachineProcessor(jderr12_13).status).toBe('error');
  expect(jdMachineProcessor(jderr12_13).error).toBe('JDE12.13');
});

test('JDERR12.14', () => {
  expect(jdMachineProcessor(jderr12_14).status).toBe('error');
  expect(jdMachineProcessor(jderr12_14).error).toBe('JDE12.14');
});

test('JDERR13.13', () => {
  expect(jdMachineProcessor(jderr13_13).status).toBe('error');
  expect(jdMachineProcessor(jderr13_13).error).toBe('JDE13.13');
});

test('JDERR13.14', () => {
  expect(jdMachineProcessor(jderr13_14).status).toBe('error');
  expect(jdMachineProcessor(jderr13_14).error).toBe('JDE13.14');
});

test('JDERR14.14', () => {
  expect(jdMachineProcessor(jderr14_14).status).toBe('error');
  expect(jdMachineProcessor(jderr14_14).error).toBe('JDE14.14');
});

test('JDERR23.22', () => {
  expect(jdMachineProcessor(jderr23_22).status).toBe('error');
  expect(jdMachineProcessor(jderr23_22).error).toBe('JDE23.22');
});

test('JDERR24.23', () => {
  expect(jdMachineProcessor(jderr24_23).status).toBe('error');
  expect(jdMachineProcessor(jderr24_23).error).toBe('JDE24.23');
});
