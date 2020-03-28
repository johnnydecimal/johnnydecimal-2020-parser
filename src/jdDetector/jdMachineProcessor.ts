// External modules
import { interpret } from 'xstate';
// Internal modules
import jdFileParser from './jdFileParser';
import jdMachine from '../xstate/jdMachine';
// Types
import JDLineObject from '../types/JDLineObject';
import JDMachineProcessorOutput from '../types/jDMachineProcessorOutput';

/**
 * jdMachineProcessor takes a multi-line string and, using various helper
 * functions, determines whether it is valid JD. If so, an object with
 * { status: 'success', jdArray: [...] } is returned. If not, an object with
 * { status: 'failure' } is returned.
 *
 * @param {string} input A string, 1+ lines long, of (potentially)
 *                       JD-formatted text to analyse.
 * @returns {object} An object of type JDMachineProcessorOutput.
 */
const jdMachineProcessor = (input: string): JDMachineProcessorOutput => {
  // Create the array of objects to analyse.
  let detectedArray: Array<JDLineObject> = [];
  let error: string | undefined;
  let errorLine: Number | undefined;

  detectedArray = jdFileParser(input);

  // Start the machine.
  const jdMachineService = interpret(jdMachine).start();

  // Run the array of objects through the machine.
  for (let i = 0; i < detectedArray.length; i++) {
    const transition = detectedArray[i].jdType.toUpperCase();
    jdMachineService.send(transition);

    // If the state is now error, we capture which row it happened on.
    if (jdMachineService.state.value === 'error') {
      const previousState = jdMachineService.state.history?.value;
      error = `Everything was going really well at line ${i}, where we were in a state of '${previousState}'. Then line ${i +
        1} put the machine in an error state by causing the transition '${transition}' to be sent.`;
      errorLine = i + 1;
      break;
    }
  }

  if (jdMachineService.state.value !== 'error') {
    jdMachineService.stop();
    return {
      status: 'success',
      jdArray: detectedArray,
    };
  } else {
    jdMachineService.stop();
    return { status: 'failure', error, errorLine };
  }
};

export default jdMachineProcessor;
