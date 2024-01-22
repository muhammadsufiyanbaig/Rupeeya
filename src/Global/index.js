import React, { createContext, useReducer, useEffect } from "react";

export const initialState = {
  transactions: [],
};

export const GlobalContext = createContext(initialState);

export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { transactions: [...state.transactions, action.payload] };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState, () => {
    const localData = localStorage.getItem('transactions');
    return localData ? { transactions: JSON.parse(localData) } : initialState;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <GlobalContext.Provider value={{ transactions: state.transactions, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
