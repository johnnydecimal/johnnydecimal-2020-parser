import { Machine, assign } from 'xstate';

import isAreaOrderValid from '../jdHelpers/isAreaOrderValid';
import isCategoryOrderValid from '../jdHelpers/isCategoryOrderValid';
import isIDOrderValid from '../jdHelpers/isIDOrderValid';
import isCategoryInArea from '../jdHelpers/isCategoryInArea';
import isIDInCategory from '../jdHelpers/isIDInCategory';

// Context
const updateAreaContext = assign({
  area: (context, event) => event.jdNumber,
});
const updateCategoryContext = assign({
  category: (context, event) => event.jdNumber,
});
const updateIDContext = assign({
  id: (context, event) => event.jdNumber,
});

// Guards
const guardAreaOrderValid = (context, event, guardMeta) => {
  if (isAreaOrderValid(context.area, event.jdNumber)) {
    return true;
  } else {
    context.error =
      'JDE12.12: An area which immediately follows another area has an area number lower than the preceding area.';
    return false;
  }
};

// Next up, Johnny: split this out to two guards so you can know exactly
// what failed and set context.error accordingly.
const isCategoryOrderValidGuard = (context, event, guardMeta) => {
  if (
    isCategoryInArea(context.area, event.jdNumber) &&
    isCategoryOrderValid(context.category, event.jdNumber)
  ) {
    return true;
  } else {
    switch (guardMeta.state.value) {
      case 'area_detected':
        context.error = `area`;
        break;
      case 'category_detected':

      default:
        break;
    }
  }
};

const idValid = (context, event) => {
  return (
    isIDInCategory(context.category, event.jdNumber) &&
    isIDOrderValid(context.id, event.jdNumber)
  );
};

const jdMachine = Machine(
  {
    id: 'jdLanguage',
    initial: 'start',
    strict: true,
    context: {
      area: '',
      category: '',
      id: '',
      error: '',
    },
    states: {
      start: {
        on: {
          AREA: {
            target: 'area_detected',
            actions: 'updateAreaContext',
          },
          CATEGORY: 'error',
          ID: 'error',
          COMMENT: 'start',
          DIVIDER: 'start',
          EMPTYLINE: 'start',
          EOF: 'eof',
          ERROR: 'error',
        },
      },

      area_detected: {
        on: {
          AREA: [
            {
              target: 'area_detected',
              actions: 'updateAreaContext',
              cond: 'guardAreaOrderValid',
            },
            { target: 'error' },
          ],
          CATEGORY: [
            {
              target: 'category_detected',
              actions: 'updateCategoryContext',
              cond: 'categoryValid',
            },
            { target: 'error' },
          ],
          ID: 'error',
          COMMENT: 'area_detected',
          DIVIDER: 'area_detected',
          EMPTYLINE: 'area_detected',
          EOF: 'eof',
          ERROR: 'error',
        },
      },

      category_detected: {
        on: {
          AREA: [
            {
              target: 'area_detected',
              actions: 'updateAreaContext',
              cond: 'guardAreaOrderValid',
            },
            { target: 'error' },
          ],
          CATEGORY: [
            {
              target: 'category_detected',
              actions: 'updateCategoryContext',
              cond: 'categoryValid',
            },
            { target: 'error' },
          ],
          ID: [
            {
              target: 'id_detected',
              actions: 'updateIDContext',
              cond: 'idValid',
            },
            { target: 'error' },
          ],
          COMMENT: 'category_detected',
          DIVIDER: 'category_detected',
          EMPTYLINE: 'category_detected',
          EOF: 'eof',
          ERROR: 'error',
        },
      },

      id_detected: {
        on: {
          AREA: [
            {
              target: 'area_detected',
              actions: 'updateAreaContext',
              cond: 'guardAreaOrderValid',
            },
            { target: 'error' },
          ],
          CATEGORY: [
            {
              target: 'category_detected',
              actions: 'updateCategoryContext',
              cond: 'categoryValid',
            },
            { target: 'error' },
          ],
          ID: [
            {
              target: 'id_detected',
              actions: 'updateIDContext',
              cond: 'idValid',
            },
            { target: 'error' },
          ],
          COMMENT: 'id_detected',
          DIVIDER: 'id_detected',
          EMPTYLINE: 'id_detected',
          EOF: 'eof',
          ERROR: 'error',
        },
      },

      eof: {
        type: 'final',
      },

      error: {
        type: 'final',
      },
    },
  },
  {
    actions: { updateAreaContext, updateCategoryContext, updateIDContext },
    guards: {
      guardAreaOrderValid,
      categoryValid: isCategoryOrderValidGuard,
      idValid,
    },
  }
);

export default jdMachine;

/* TypeScript stuff. Save this for later.
interface JDStateSchema {
  states: {
    start: {};
    area_detected: {};
    category_detected: {};
    id_detected: {};
    eof: {};
    error: {};
  };
}

type ContextObject = {
  area: string;
  category: string;
  id: string;
};

type JDEvent =
  | { type: 'AREA'; actions: 'updateAreaContext' }
  | { type: 'CATEGORY' }
  | { type: 'ID' }
  | { type: 'ERROR' }
  | { type: 'COMMENT' }
  | { type: 'DIVIDER' }
  | { type: 'EMPTYLINE' }
  | { type: 'EOF' };

*/
