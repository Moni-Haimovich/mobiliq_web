import React from "react";

import ActionTypes from "./actionTypes";

const initialState = {
  properties: [],
  filteredProperties: [],
  curProperty: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
      };
    case ActionTypes.SET_FILTERED_PROPERTIES:
      return {
        ...state,
        filteredProperties: action.payload,
      };
    case ActionTypes.SET_CUR_PROPERTY:
      return {
        ...state,
        curProperty: action.payload,
      };
    default:
      return state;
  }
};

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const ContextProvider = ({ children, properties }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.SET_PROPERTIES, payload: properties });
  }, [dispatch, properties]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export { StateContext, DispatchContext, ContextProvider };
