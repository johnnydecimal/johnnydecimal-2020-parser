import isAreaOrderValid from '../isAreaOrderValid';
import isCategoryOrderValid from '../isCategoryOrderValid';
import isCategoryInArea from '../isCategoryInArea';

test('isAreaOrderValid', () => {
  expect(isAreaOrderValid('10-19', '40-49')).toBe(true);
  expect(isAreaOrderValid('40-49', '10-19')).toBe(false);
});

test('isCategoryOrderValid', () => {
  expect(isCategoryOrderValid('10', '11')).toBe(true);
  expect(isCategoryOrderValid('12', '11')).toBe(false);
});

test('category is in area', () => {
  expect(isCategoryInArea('10-19', '10')).toBe(true);
  expect(isCategoryInArea('10-19', '20')).toBe(false);
});
