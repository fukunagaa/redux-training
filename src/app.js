import { combineReducers, createStore } from "redux";

// 基本は別ファイルとして外出し
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      // immutable なJavaScriptを意識して記載 README参照
      state = { ...state, name: action.payload };
      return state;
    case "CHANGE_AGE":
      // immutable なJavaScriptを意識して記載 README参照
      state = { ...state, age: action.payload };
      return state;
  }
  return state;
};

// 基本は別ファイルとして外出し
const tweetsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TWEET":
      state = state.concat({ id: Date.now(), text: action.payload });
      return state;
  }
  return state;
};

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
});

// createStoreにreducerとデータ初期値を渡す
const store = createStore(reducers);

// storeが変更された時に呼び出される
store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "CHANGE_NAME", payload: "Taro" });
store.dispatch({ type: "CHANGE_AGE", payload: 16 });
store.dispatch({ type: "CHANGE_AGE", payload: 17 });
store.dispatch({ type: "ADD_TWEET", payload: "I like redux" });
store.dispatch({ type: "ADD_TWEET", payload: "LOL LOL LOL" });
