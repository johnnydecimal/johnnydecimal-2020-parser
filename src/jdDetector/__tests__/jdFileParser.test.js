import jdFileParser from '../jdFileParser';
import testJDString from '../../data/testJDString';

test('detects a correct file', () => {
  // Indexes here include blank lines, which *are* returned by
  // jdFileParser.
  expect(jdFileParser(testJDString)[0].jdType).toBe('area');
  expect(jdFileParser(testJDString)[1].jdType).toBe('category');
  expect(jdFileParser(testJDString)[2].jdType).toBe('id');
  expect(jdFileParser(testJDString)[2].jdNumber).toBe('11.01');
  expect(jdFileParser(testJDString)[2].jdTitle).toBe('ID me yeah');
  expect(jdFileParser(testJDString)[6].comment).toBe('which has a comment');
  expect(jdFileParser(testJDString)[8].jdNumber).toBe('22.22');
});

test('detects errors', () => {
  expect(
    jdFileParser(`10-19 Valid area
  invalid input on line 1`)[1].jdType
  ).toBe('error');
});

test('keeps going after an error', () => {
  expect(
    jdFileParser(`10-19 Valid area
  invalid input on line 1
  32 valid category`)[2].jdType
  ).toBe('category');
});
