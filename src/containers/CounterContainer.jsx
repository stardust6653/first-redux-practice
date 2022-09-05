import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { Decrease, Increase } from "../redux/actions/counter";

function CounterContainer() {
  // 현재 여기서의 state는 reducer에 명시한 initialState = {number = 0}
  const number = useSelector(state => state.number);
  const dispatch = useDispatch();
  // 액션 객체 생성함수 Increase 에 매개변수(diff)값 1을 넣어줌으로서 state + 1 을 시켜주는 함수가 됨
  const onIncrease = () => {
    dispatch(Increase(1));
  };

  const onDecrease = () => {
    dispatch(Decrease(1));
  };

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
}

export default CounterContainer;
