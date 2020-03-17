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
  jdType: 'project' | 'error';
  jdNumber: string | null;
  jdTitle: string | null;
};

const jdDetector = (input: string): ReturnValue => {
  // Set up our return variables
  let jdType: 'project' | 'area' | 'category' | 'id' | 'separator' | 'comment';
  let jdNumber: string;
  let jdTitle: string;

  // .exec returns:
  // ([0?] Any leading spaces), [0] full, [1] number, [2] space, [3] title, [4] comments
  // Don't forget you can check the .length of the array to get a sneaky look.

  // Are we a Project? ('100 My great project')
  const processedInput = /^( *)(\d\d\d)( )(.*)( \/\/.*)/.exec(input);
  if (processedInput) {
    jdType = 'project';

    // If processedInput[1] is full of spaces, they're leading. Ditch them.
    if (processedInput[1].match(/ */)) {
      processedInput.splice(1, 1);
    }

    console.log(processedInput);
  }

  // Check for Area
  if (/(\d\d-\d\d)( )(.*)( \/\/.*)/.exec(input)) {
    return { jdType: 'project' };
  }

  return { jdType: 'error' };
};

export default jdDetector;
