# Redux란?

서버 응답, 캐시 데이터, 지역적으로 생성되어 사용되나 서버에는 저장되지 않은 데이터, 활성화된 라우트, UI 상태 등의 것들을 상태, 즉 state라고 얘기한다.

리덕스는 웹 사이트 혹은 애플리케이션의 상태(state) 관리를 해줄 목적으로 사용하는 자바스크립트 라이브러리이다.

---

## Redux 3대 원칙

1. App의 모든 상태(state)는 단 하나의 저장소(store) 안에 하나의 객체 트리 구조로 저장된다.

2. 상태는 읽기 전용이다. 상태를 변경시킬 유일한 방법은 action 객체를 이용하는 것 뿐이다.

3. 액션에 의해 상태 트리가 어떻게 변화하는 지를 지정하기 위해서는 순수 함수(동일한 입력에는 항상 같은 값을 반환하는 함수) 리듀서를 만들어야한다.

---

## 1. 액션타입 정의

타입을 변수 형태로 미리 만들어둔다. 이는 export를 해서 다른 파일에 편하게 불러와 사용하고 또한 혹시나 있을 오탈자 등을 방지하기 위함이기도 하다.

```JS
  export const INC_COUNT = "INC_COUNT";
```

---

## 2. 액션 생성 함수

Action 생성함수는 원칙적으로 항상 액션 객체를 리턴해야한다. { type: INC_COUNT, payload: ~~ } 와 같은 객체를 리덕스에서는 action 객체라고 말하며, 이러한 action 객체를 reducer로 내보내는 행위를 dispatch라고 한다.

```JS
  export function incCount(diff){
	  return {
		  type: INC_COUNT,
		  payload: {diff}
	  }
  }
```

위와 같이 Action 객체를 return하는 함수를 action 생성 함수라고 한다.<br/>
만약 해당 액션 생성함수를 활용해 Count앱을 만든다고 했을 때, 함수 실행 시 2만큼 숫자가 증가하도록 하는 Action 객체를 생성해 Reducer로 내보내고 싶다면

```JS
  const dispatch = useDispatch()
  dispatch(incCount(2))
```

위와 같이 dispatch Hook을 활용해 reducer로 내보낸다.

---

## 3. Reducer

state 의 값은 불변성을 유지해야한다. 그 말은 동일한 파라미터가 들어왔을 때 동일한 결과를 출력하는 순수함수여야한다는 말이다. <br/><br/>

Reducer 는 state(현재 상태)와 action(dispatch를 통해 들어오는 객체 데이터)를 파라미터로 받는다. <br/><br/>

일반적으로 리듀서는 switch문으로 실행되며 form은 아래와 같다.

```JS
  function reducer (state, action){
    switch(action.type){
      case "ADD" :
        return state + 1;
      case "DELETE" :
        return state - 1;
      default :
        return state;
    }
  }
```

---

## 4. Store

store는 리듀서와 state들을 담아놓은 곳을 말한다. 이 스토어를 Provider를 통해 컴포넌트에 공유함으로써 어떤 컴포넌트에서든 리듀서와 상태를 가져와 사용할 수 있도록 코드를 작성한다. <br/><br/>

_필수 규칙 : 하나의 앱에는 하나의 스토어만이 존재하도록 해야한다_ <br/><br/>

store.js 파일을 생성한 후 createStore()를 통해 store를 생성한다.

```JS
  // redex 에서 legacy_createStore를 import
  import { legacy_createStore as createStore } from "redux";
  // 만들어뒀던 reducer인 counter를 import
  import counter from "./reducers/counter";

  // 변수를 생성해 createStore(import한 reducer이름)를 선언해주고
  const store = createStore(counter);

  // store를 export하면 다른 컴포넌트 어디서든 이 counter 리듀서를 사용할 수 있다.
  export default store;

  // legacy_createStore 가 아닌 createStore의 경우 redux toolkit 사용을 권장하기 위해 사용이 중단된 상태이다. (아예 사용이 없는 것은 아님)
```

이후 App.js 에서 Provider를 활용해 데이터를 불러온다

```JS
  // Provider를 import 해옴
  import { Provider } from "react-redux";
  // store를 import 해옴
  import store from './redux';

  // Provider 를 통해 store 내부에 있는 store를 불러와 사용
  function App() {
    return (
      <Provider store={store}>
			  <Counter />
      </Provider>
    );
  }

  export default App;
```

---

## 5. useSelector

Redux로 관리 중인 상태를 불러오기 위한 Hook으로 아래의 예시와 같이 사용 가능하다.

```JS
  // state안에 number라는 데이터가 있으면 아래와 같이 가지고 올 수 있음
  import { useSelector } from "react-redux"

  const { number } = useSelector(state => state)

  // 위의 구문은 아래와 같음(아래 구문을 구조분해할당하여 위처럼 씀)

  const number = useSelector(state => state.number)

  // 만약 dispatch를 통해 state값이 변하면 useSelector로 불러들인 state도 변하게 됨
```

---

## 6. useDispatch

Redux에서 dispatch함수를 실행할 수 있게 해주는 Hook으로 아래의 예시와 같이 사용 가능하다.

```JS
  // 만들어진 액션 객체를 Reducer로 전달하는 과정을 수행해주는 Hook
  import { useDispatch } from "react-redux"

  const dispatch = useDispatch()

  // 사용 예시
  dispatch(incCount(1))
```
