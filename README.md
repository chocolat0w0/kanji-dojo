# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 初期設定
動作確認済み環境
- node v17.4.0, npm 8.3.1 (m1 Mac) 動かない
- yarnインストール済み

前環境（逆に動かなくなったかも）
- node v14.4.0

初期設定
`% yarn`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# ディレクトリ構成
Atomic Design を参考にする。以下気をつけながら分ける。
## components
### atoms
- 最小単位のパーツ
- 汎用的に作る
- プロジェクトに依存しない

### molecules
- atoms, moleculesを使う
- 汎用的に作る
- プロジェクトに依存しない

### organisms
- プロジェクトに依存する

### templates
- organisms, moleculesを使ってレイアウトを決める
- ロジックは持たない

### pages
- ページ
- 現状 App だけ。後で分離(TODO)

# テスト
参考ページ
https://testing-library.com/docs/

# 思ったことメモ
- React は単方向バインドなので、Vue と違ってステータスの更新は自分で書く。
- 型は定義できるが typeof はプリミティブ型。型判定できるキーをつける。(TODO)
-
