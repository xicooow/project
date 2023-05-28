import { State, ActionType } from ".";

export const initialState = {} as State;

export function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: { ...action.payload } };
    case "CLEANUP":
      return initialState;
    default:
      return state;
  }
}
