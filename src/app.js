import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { createPromise } from "redux-promise-middleware";
import axios from "axios";

// state の初期値の定義
const initialStateUser = {
  fetching: false,
  fetched: false,
  name: "",
  age: 99,
  err: null,
};

const initialStateTweet = [];

// 基本は別ファイルとして外出し
const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      // immutable なJavaScriptを意識して記載 README参照
      state = { ...state, name: action.payload };
      return state;
    case "CHANGE_AGE":
      state = { ...state, age: action.payload };
      return state;
    case "FETCH_USERS_PENDING":
      return { ...state, fething: true };
    case "FETCH_USERS_FULFILLED":
      console.log(JSON.parse(action.payload));
      return { ...state, fetching: false, fetched: true };
    case "FETCH_USERS_REJECTED":
      state = { ...state, fetching: false, error: payload };
    case "ERR":
      throw new Error("its error");
  }
  return state;
};

// 基本は別ファイルとして外出し
const tweetsReducer = (state = initialStateTweet, action) => {
  switch (action.type) {
    case "ADD_TWEET":
      state = state.concat({ id: Date.now(), text: action.payload });
      return state;
  }
  return state;
};

// reducerのエラーハンドリング用にmiddlewareに追加
const error = (store) => (next) => (action) => {
  try {
    // この処理を追加することで次の処理(reducer)に入る
    next(action);
  } catch (e) {
    console.log("ERROR was occured", e);
  }
};
// reducerが呼び出される時関数を呼び出すためのmiddlewareを追加
const middleware = applyMiddleware(createPromise(), createLogger(), error);

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
});

// createStoreにreducerとデータ初期値を渡す
const store = createStore(reducers, middleware);

// storeが変更された時に呼び出される
store.subscribe(() => {
  console.log("store changed");
});

store.dispatch({ type: "CHANGE_NAME", payload: "Taro" });
store.dispatch({ type: "CHANGE_AGE", payload: 16 });
store.dispatch({ type: "CHANGE_AGE", payload: 17 });
store.dispatch({ type: "ADD_TWEET", payload: "I like redux" });
store.dispatch({ type: "ADD_TWEET", payload: "LOL LOL LOL" });
// 非同期処理を実装
// do something async
// axiosを入れてみる(正常に動くことを確認)
store.dispatch({
  type: "FETCH_USERS",
  payload: axios.get("http://localhost:18080/"),
});
store.dispatch({ type: "ERR" });
