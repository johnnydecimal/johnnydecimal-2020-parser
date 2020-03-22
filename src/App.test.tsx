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
  expect(jdDetector('101 my great project').jdNumber).toBe('101');
  expect(jdDetector('101 my great project').jdTitle).toBe('my great project');
  expect(jdDetector('101 my great project // with comment').jdType).toBe(
    'project'
  );
  expect(jdDetector('101 my great project // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct Area', () => {
  expect(jdDetector('10-19 my special area').jdType).toBe('area');
  expect(jdDetector('10-19 my special area').jdNumber).toBe('10-19');
  expect(jdDetector('10-19 my special area').jdTitle).toBe('my special area');
  expect(jdDetector('90-99 my special area').jdType).toBe('area');
  expect(jdDetector('90-99 my special area // with comment').jdType).toBe(
    'area'
  );
  expect(jdDetector('90-99 my special area // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct Category', () => {
  expect(jdDetector('10 my cracking cat').jdType).toBe('category');
  expect(jdDetector('10 my cracking cat').jdNumber).toBe('10');
  expect(jdDetector('10 my cracking cat').jdTitle).toBe('my cracking cat');
  expect(jdDetector('10 my cracking cat // with comment').jdType).toBe(
    'category'
  );
  expect(jdDetector('10 my cracking cat // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct ID', () => {
  expect(jdDetector('12.34 my interesting id').jdType).toBe('id');
  expect(jdDetector('12.34 my interesting id').jdNumber).toBe('12.34');
  expect(jdDetector('12.34 my interesting id').jdTitle).toBe(
    'my interesting id'
  );
  expect(jdDetector('12.34 my interesting id // with comment').jdType).toBe(
    'id'
  );
  expect(jdDetector('12.34 my interesting id // with comment').comment).toBe(
    'with comment'
  );
});

test('returns error on nonsense', () => {
  expect(jdDetector('10a not a project').jdType).toBe('error');
  expect(jdDetector('10-99 not an area').jdType).toBe('error');
  expect(jdDetector('10-29 not an area').jdType).toBe('error');
  expect(jdDetector('1x-19 not an area').jdType).toBe('error');
  // There must be a space after the number
  expect(jdDetector('100not a project').jdType).toBe('error');
  expect(jdDetector('10-19not an area').jdType).toBe('error');
  expect(jdDetector('10not a category').jdType).toBe('error');
});
