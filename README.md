# RepositorySearchApp

## 概要
- これは、React+TypeScript+graphql+apollo+antd をベースにしたレポジトリ検索アプリケーションです。主な機能は次のとおりです。
    ###### ＊付き項目は追加機能です 
    - レポジトリ検索機能
    >1. 入力したテキストをもとに、GitHubの公開レポジトリを検索しリスト表示する
    >2. ＊ 入力したテキストをキャッシュする、再利用するのは可能です。また、キャッシュしたデータを1つの削除とすべての削除も可能です
    - レポジトリリスト表示機能
    >1. 公開レポジトリ名をクリックすると、対応するイシュー閲覧ページに遷移する
    >2. 追加読み込みボタンを押すことで検索結果を追加読み込みする
    >3. ＊ moreボタンを押すことで、GitHubのリポジトリの詳細ページに遷移する
    - レポジトリに紐づくイシューリスト表示機能
    >1. 特定のレポジトリに紐づくイシューのタイトルをリスト表示する（最新10件）
    >2. ＊ イシューのタイトル以外に、ステート、アバター、作成者、作成日、対応しているリポジトリ名も分かりやすく表示する
    >3. ＊ イシューリストからレポジトリリストページへ戻ると、元ページの状態を維持できる
    >4. ＊ moreボタンを押すことで、GitHubのイシューの詳細ページに遷移する
    
## プロジェクトの開始
### 1. 技術スタック
- nodejs 18.16.0
- react 17.0.2
- react-dom 17.0.2
- react-router 6.23.1
- ant-design 5.18.3
- graphql 16.9.1
- apollo/client 3.10.6
- typescript 4.9.5

### 2. 依存関係をインストール
```shell 
pnpm install
```  
or
```shell 
npm install
 ``` 
### 3. プロジェクトを起動
```shell 
pnpm start
``` 
 or
```shell 
npm start
```   
    webブラウザで：http://localhost:3000/
    

## プロジェクト構成
``` 
 ├── public
 ├── src
 │   ├── api
 │   ├── interface
 │   ├── pages
 │   ├── router
 │   ├── App.tsx
 │   ├── App.css
 │   ├── index.tsx
 │   └── index.css
 ├── .gitignore
 ├── config-overrides.js
 ├── package.json
 ├── pnpm-lock.yaml
 │── tsconfig.json
 └── README.md
