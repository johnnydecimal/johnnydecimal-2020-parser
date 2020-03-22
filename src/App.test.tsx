import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import jdDetector from './input_detector/jdDetector';

/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('detects a correct Project', () => {
  expect(jdDetector('101 my great project').jdType).toBe('project');
  expect(jdDetector('101 my great project // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct Area', () => {
  expect(jdDetector('10-19 my great area').jdType).toBe('area');
  expect(jdDetector('90-99 my great area').jdType).toBe('area');
  expect(jdDetector('90-99 my great area // with comment').comment).toBe(
    'with comment'
  );
});

test('returns error on nonsense', () => {
  expect(jdDetector('10 not a project').jdType).toBe('error');
  expect(jdDetector('10a not a project').jdType).toBe('error');
  expect(jdDetector('10-99 not an area').jdType).toBe('error');
  expect(jdDetector('10-29 not an area').jdType).toBe('error');
  expect(jdDetector('1x-19 not an area').jdType).toBe('error');
});
