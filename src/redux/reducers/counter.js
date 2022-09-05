import { DECREASE, INCREASE } from "../constants/counter";

const initialState = { number: 0 };

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return { number: state.number + action.payload.diff };
    case DECREASE:
      return { number: state.number - action.payload.diff };
    default:
      return state;
  }
}
