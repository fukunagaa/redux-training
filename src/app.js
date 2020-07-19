import { createStore } from "redux";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INC":
      return state + action.payload;
    case "DEC":
      return state - action.payload;
  }
  return state;
};

// createStoreにreducerとデータ初期値を渡す
const store = createStore(reducer, 1);

// storeが変更された時に呼び出される
store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "INC", payload: 1 });
store.dispatch({ type: "INC", payload: 2 });
store.dispatch({ type: "INC", payload: 3 });
store.dispatch({ type: "INC", payload: 4 });
store.dispatch({ type: "DEC", payload: 10 });
store.dispatch({ type: "AAA", payload: 1 });
