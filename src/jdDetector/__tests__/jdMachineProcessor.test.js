import jdMachineProcessor from '../jdMachineProcessor';
import testJDString from '../../data/testJDString';

test('detects a correct file', () => {
  expect(jdMachineProcessor(testJDString).status).toBe('success');
  expect(jdMachineProcessor(testJDString).jdArray[1].jdType).toBe('category');
  expect(jdMachineProcessor(testJDString).jdArray[5].comment).toBe(
    'which has a comment'
  );
});

test('accepts a blank input', () => {
  // So an empty string is valid JD.
  expect(jdMachineProcessor('').status).toBe('success');
  expect(jdMachineProcessor('').jdArray.length).toBe(0);
});
