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

### immutable
`state = {...state, name = "aaa"}`はES6の記法であり`Object.assign`と同一の意味 =>新たにオブジェクトを作成している
`state.name = action.payload` とすると、前のstateまで更新してしまうため、不変性が損なわれてしまう
そのため、前者のimmutable なJavaScriptな方法で記載することを意識しなければいけない
