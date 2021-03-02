import React from 'react';

import ActionTypes from './actionTypes';

const initialState = {
  isLoading: false,
  properties: [],
  curProperty: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
      };
    case ActionTypes.SET_CUR_PROPERTY:
      return {
        ...state,
        curProperty: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export { StateContext, DispatchContext, ContextProvider };
