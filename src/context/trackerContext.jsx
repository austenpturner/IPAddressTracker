import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const TrackerContext = createContext(null);

const SET_OUTPUT = "SET_OUTPUT";

function trackerReducer(state, action) {
  switch (action.type) {
    case SET_OUTPUT:
      console.log(action.payload);
      return { ...state, output: action.payload };
    default:
      break;
  }
}

const initialState = {
  output: [],
};

export default function TrackerProvider({ children }) {
  const [state, dispatch] = useReducer(trackerReducer, initialState);

  return (
    <TrackerContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackerContext.Provider>
  );
}

TrackerProvider.propTypes = {
  children: PropTypes.object,
};
