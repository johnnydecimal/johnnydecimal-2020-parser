/**
 * testJDString is a test string that you can use to validate multi-line
 * JD input.
 *
 * If this string is updated, update jdFileParser.test.js.
 */
const validTestJDString: string = `10-19     My special area
   11     My cool category
   11.01  ID me yeah
   11.02  Whatever
   12     Great

20-29     Another area // which has a comment
   22     Spiffy
   22.22  Aha`;

// Test for JDE12.12, an area which immediately follows another area has an
// area number lower than the preceding area.
const jde12_12 = `20-29 area
10-19 error`;

export { validTestJDString, jde12_12 };
