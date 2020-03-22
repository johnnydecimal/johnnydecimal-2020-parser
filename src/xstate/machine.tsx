import React from 'react';
import { Machine, interpret } from 'xstate';

const DecimalMachine = () => {
  // If this is a project-based file, these are the states.
  const projectFileStates = {
    initial: 'project_detected',
    states: {
      project_detected: {
        on: {
          FIND_COMMENT: 'project_detected',
          FIND_PROJECT: 'project_detected',
          FIND_AREA: 'area_detected',
          OTHER: 'error',
        },
      },
      area_detected: {
        on: {
          FIND_COMMENT: 'area_detected',
          FIND_PROJECT: 'project_detected',
          FIND_AREA: 'area_detected',
          FIND_CATEGORY: 'category_detected',
          OTHER: 'error',
        },
      },
      category_detected: {
        on: {
          FIND_COMMENT: 'category_detected',
          FIND_PROJECT: 'project_detected',
          FIND_AREA: 'area_detected',
          FIND_CATEGORY: 'category_detected',
          FIND_ID: 'id_detected',
          OTHER: 'error',
        },
      },
      id_detected: {
        on: {
          FIND_COMMENT: 'id_detected',
          FIND_PROJECT: 'project_detected',
          FIND_AREA: 'area_detected',
          FIND_CATEGORY: 'category_detected',
          FIND_ID: 'id_detected',
          OTHER: 'error',
        },
      },

      error: {},
    },
    on: {
      EOF: 'eof',
    },
  };

  const singleProjectFileStates = {
    initial: 'start',
    states: {
      start: {},
    },
    on: {
      EOF: 'eof',
    },
  };

  const decimalMachine = Machine({
    id: 'jdLanguage',
    initial: 'start',
    states: {
      start: {
        on: {
          FIND_COMMENT: 'start',
          FIND_PROJECT: 'project_based_file',
          FIND_AREA: 'not_project_based_file',
          NOT_FIND_EITHER: 'error',
        },
      },

      project_based_file: {
        ...projectFileStates,
      },

      not_project_based_file: {
        ...singleProjectFileStates,
      },

      eof: {
        type: 'final',
      },
      error: {
        type: 'final',
      },
    },
  });

  const promiseService = interpret(decimalMachine).onTransition(state =>
    console.log(state.value)
  );

  // Start the service
  promiseService.start();
  /*

  promiseService.send('FIND_PROJECT');
  promiseService.send('FIND_CATEGORY');
  promiseService.send('FIND_AREA');
  promiseService.send('FIND_ID');
  promiseService.send('FIND_ID');
  promiseService.send('OTHER');
  */

  return <div>Didn't do much but console.log, to be honest.</div>;
};

export default DecimalMachine;
