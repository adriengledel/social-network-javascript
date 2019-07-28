
/**
 * Chains reducers provided through an array. Reducers
 * are chained in the order of the array: first reduces to be
 * called is the function with index 0, second is 1, etc.
 *
 * @param  {Array} reducers      - Array of reducers
 * @param  {Object} defaultState - State used as default for first reducer in the chain
 * @return {Function}            - Resulting reducer
 */
export const composeReducers = (reducers, defaultState) => {
  if (reducers.length === 0) {
    return (state => state);
  }
  else {
    const [first, ...rest] = reducers;
    const composed = composeReducers(rest);

    return (state = defaultState, action) => composed(first(state, action), action);
  }
};

/**
 * Create a reducer given a definition object.
 *
 * A definition object is an object with the following form:
 *
 * ```
 * {
 *    field1 : {
 *      subField1 : (state, action)=> {...},
 *      subField2 : (state, action)=> {...}
 *    },
 *    field2 : (state, action)=> {...}
 * }
 * ```
 *
 * The resulting reducer takes input state and calls the provided
 * subreducers on `subField1`, `subField2` and `field2`.
 *
 * If the provided state has no value (falsy values) for these
 * fields, the reducer creates an empty object `{}` to be used as
 * state for the subfields reducers.
 *
 * @param  {Object} definition - Reducer definition
 * @return {Function}          - Resulting reducer
 */
export const createReducer = definition => {
  if (typeof definition === 'function') {
    return definition;
  }
  else {
    const reducedDefinition = {};

    Object.entries(definition).forEach(([field, def]) => {
      reducedDefinition[field] = createReducer(def);
    });

    return (state, action) => {
      state = state || {};
      const reducedState = {...state};

      Object.entries(reducedDefinition).forEach(([field, reducer]) => {
        reducedState[field] = reducer(state[field], action);
      });

      return reducedState;
    };
  }
};