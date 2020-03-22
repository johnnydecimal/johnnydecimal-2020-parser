/* Define the type of our return value.
 *
 * It looks like this:
 * {
 *   jdType:   'area'
 *   jdNumber: '10-19'
 *   jdTitle:  'My great area'
 * }
 *
 * Think about the purpose of this function. You feed it <anything> and it tells you
 * whether that thing is a PRO.AC.ID *or* whether it's none of those things and is not
 * a valid input.
 *
 * Or it could tell you that the thing is a comment. Or a blank line. Or a header row.
 *
 * Either way, it is *not* the job of this function to tell you whether this is the
 * right place to be finding that thing. Not at all. That's the state machine, which
 * will be given the output from this function.
 *
 */

/* How to build this thing.
 *
 * A TDD-ish approach? Define a type, build the test for that type, repeat.
 */

type ReturnValue = {
  jdType: 'project' | 'area' | 'category' | 'id' | 'error';
  jdNumber: string | null;
  jdTitle: string | null;
  comment: string | null;
};

const jdDetector = (input: string): ReturnValue => {
  const returnValue = {} as ReturnValue;
  let isProject, isArea, isCategory, isID: any;

  input = input.trim();

  // -- Look for a comment and pop it out if it exists -----------------------
  if (input.split('//').length === 2) {
    returnValue.comment = input.split('//')[1].trim();
    // Remove the comment from the input
    input = input.split('//')[0].trim();
  }

  // -- Check for a Project ('100 My great project') -------------------------
  isProject = /(\d\d\d)( *)(.*)/.exec(input);
  if (isProject) {
    returnValue.jdType = 'project';
    returnValue.jdNumber = isProject[1];
    returnValue.jdTitle = isProject[3].trim();
    return returnValue;
  }

  // -- Check for an Area ('10-19 My special area') --------------------------
  isArea = /(\d\d-\d\d)( *)(.*)/.exec(input);
  if (isArea) {
    // -- Check if the Area number is formatted correctly --------------------
    const areaFormatCheck = isArea[1].split('-');
    // The first number mut be a divisor of ten, and
    // the second number must be 9 more than the first number
    if (
      Number(areaFormatCheck[0]) % 10 === 0 &&
      Number(areaFormatCheck[1]) - Number(areaFormatCheck[0]) === 9
    ) {
      returnValue.jdType = 'area';
      returnValue.jdNumber = isArea[1];
      returnValue.jdTitle = isArea[3].trim();
      return returnValue;
    }
  }

  return { jdType: 'error', jdNumber: null, jdTitle: null, comment: null };
};

export default jdDetector;
