
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";

const BoardContext = createContext();

const initialState = { tasks: [], activityLog: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        activityLog: [{ message: `Task created`, time: new Date().toISOString() }, ...state.activityLog]
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t),
        activityLog: [{ message: `Task edited`, time: new Date().toISOString() }, ...state.activityLog]
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
        activityLog: [{ message: `Task deleted`, time: new Date().toISOString() }, ...state.activityLog]
      };
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, status: action.payload.status } : t),
        activityLog: [{ message: `Task moved`, time: new Date().toISOString() }, ...state.activityLog]
      };
    case "RESET":
      return initialState;
    case "LOAD":
      return action.payload;
    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("board");
      if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch, uuid }}>
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
