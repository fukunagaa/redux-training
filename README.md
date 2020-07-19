# redux-training
reduxの基礎を学ぶプロジェクト

## プロジェクト作成
- ディレクトリ作成
```
$ mkdir redux-training
$ cd redux-training
```
- 初期化
```
$ npm init -y
```
- reduxに関するインストール
```
$ npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader babel-plugin-react-html-attrs webpack webpack-cli webpack-dev-server
$ npm install --save-dev redux
$ npm install --save-dev redux-logger
```
- 非同期処理用にインストール
```
$ npm install --save-prod redux-thunk
$ npm install --save-dev axios
```


## 補足
### webpack-dev-serverについて
webpack-dev-serverを起動オプションつきで起動することで様々な設定をすること
`--hot`: HMR(Hot Module Replacement)を有効にする
`--inline`: jsコードが変更されたら（コンパイルして）自動的にブラウザをリロードする。ブラウザ自動リロードのための仕組みがinlineモードで実行される。
`--content-base`: srcにhtmlやcssなどを置いておくコンテンツベースとなるディレクトリを [作業ディレクトリ]/src/ に指定する
`--watch-content-base` :htmlやcssなどファイルが変更されたらブラウザを自動的にリロードする
`--open-page` :index.htmlで、サーバー起動後、自動的に（デフォルトの）ブラウザを開き、指定されたページここではindex.htmlを開く
`--config` :設定ファイルへのパスを指定することで設定ファイルで使用出来る。デフォルトとして、webpack.config.js または webpackfile.jsが設定されている
`--mode` :使用するモードの指定する
`--debug` :loaderをデバッグモードに切り替える。デフォルトはfalseが設定されている
`--watch` : ファイルシステムの変更を監視する

### createStore
storeを作成する。引数としてreducerと必要であればデータ初期値とmiddlewareを渡す
storeを作成した後にdispatch関数でdispatchを行うことでstore更新が行われる

### combineReducers
複数のreducerを1つにまとめるために必要
基本的にreducerは別ファイルとして外出しすること

### applyMiddleware
reducerが呼び出される時関数を呼び出すためのmiddlewareを追加する際に必要
dispatch => middleware => reducer　の順番で呼び出される
複数のmiddlewareを定義することも可能である
`logger`のようにログ表示や`error`のように例外をハンドリングするためのmiddlewareを定義することが可能

### createLogger
redux-logerをインポートすることで使用可能となる。
middlewareにcreateLogger()を追加することでaction前のstore,actionの値,action後の値をログ表示することが可能である

### thunk
thunkかpromiseどちらかを使用する。
redux-thunkをインポートすることで使用可能となる。
middlewareにthunkを追加することでdispatchで非同期処理関数を使用できる
以下のエラーが発生した際に必須
```
ERROR was occured Error: Actions must be plain objects. Use custom middleware for async actions
```

### promise
thunkかpromiseどちらかを使用する。
redux-promise-middlewareをインポートすることで使用可能となる。
middlewareにpromise()を追加することで使用可能となる
store.dispatch で指定したaction type をprefix にして*_PENDING(非同期処理未完了状態), *_ERROR(非同期処理エラー), *_FULFILLED(非同期処理正常終了) といったsuffix を追加してaction type を発行してくれます。そのため、thunkと比べてソースコードがクリーンになります。

### immutable
`state = {...state, name = "aaa"}`はES6の記法であり`Object.assign`と同一の意味 =>新たにオブジェクトを作成している
`state.name = action.payload` とすると、前のstateまで更新してしまうため、不変性が損なわれてしまう
そのため、前者のimmutable なJavaScriptな方法で記載することを意識しなければいけない
