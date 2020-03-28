import jdLineParser from './jdLineParser';
import JDLineObject from '../types/JDLineObject';

/**
 * jdFileParser takes a multi-line string and feeds each non-blank line to
 * jdLineParser. It is non-failing, in that incorrect lines will be returned
 * with { jdType: 'error' } but the function will continue to process the
 * input.
 *
 * @param {string} input A multi-line string to be analysed.
 * @returns {array} An array of objects. Each object has type ReturnValue.
 *                  If the input is blank, an empty array is returned.
 */
const jdFileParser = (input: string): Array<JDLineObject> => {
  // If there's nothing to process, return an empty array.
  if (input === '') return [];

  let detectedArray: Array<JDLineObject> = [];

  let lines = input.split('\n');
  lines.forEach((line: string) => {
    if (line !== '') {
      // We don't return empty lines. If you choose to display empty lines
      // in your output that's a display formatting decision.
      detectedArray.push(jdLineParser(line));
    }
  });

  return detectedArray;
};

export default jdFileParser;
