import { INCREASE, DECREASE } from "../constants/counter";

//diff 는 difference 의 줄임말
export function Increase(diff) {
  return {
    type: INCREASE,
    payload: { diff },
  };
}

export function Decrease(diff) {
  return {
    type: DECREASE,
    payload: { diff },
  };
}
