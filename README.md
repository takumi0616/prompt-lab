<h1 align="center" id="title">prompt-lab</h1>

<p align="center" style="align: center;">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=popout">
  <img src="https://img.shields.io/badge/-React-000000.svg?logo=react&style=popout">
  <img src="https://img.shields.io/badge/-TypeScript-000000.svg?logo=typescript&style=popout">
  <img src="https://img.shields.io/badge/-Figma-000000.svg?logo=figma&style=popout">
  <img src="https://img.shields.io/badge/-Prisma-000000.svg?logo=prisma&style=popout">
  <img src="https://img.shields.io/badge/-Postgresql-000000.svg?logo=postgresql&style=popout">
</p>


<p id="description">生成AIの出力に自身がない人に向けた、プロンプト作成のための指標を提供するWebアプリです。パラメータを設定し、結果を確認しながらプロンプトのクオリティ向上のための体験ができます。</p>

<h2>🚀 Demo</h2>

[https://probtrace.netlify.app/](https://probtrace.netlify.app/)

<h2>Project Screenshots:</h2>

<img src="/public/screenshot.png" alt="project-image">

<h2>🛠️ Installation and Running</h2>

<p>1. ファーストコマンド</p>

```
make build
```

<p>2. アプリ立ち上げ</p>

```
make run
```

<p>アプリ再起動</p>

```
make rebuild
```

<p>prisma studio 立ち上げ</p>

```
make studio
```

<p>DB のリセット</p>

```
make dbreset
```

<p>seedの適用</p>

```
make seed
```

<h2>🍰 Contribution Guidelines:</h2>

#### branch の命名規則

- main ブランチ
  - 本番用ブランチ
- feat/[NAME]/[ISUEE_NUM]/[TITLE]
  - 機能の追加や変更などを行うブランチ，develop ブランチから派生
  - ex) feat/dodo/1-create-view-env
- fix/[NAME]/[ISUEE_NUM]/[TITLE]
  - バグの修正などを行うブランチ，develop ブランチから派生
  - ex) fix/dodo/2-fix-view-env

#### コミットの命名規則

- コミットメッセージは issue 番号を載せる
- コミットメッセージは行った開発を端的にわかりやすく書く（長すぎないように注意する）
- コミットメッセージラベルを付ける
  - [feat] file or directory の追加
  - [fix] file or directory のバグや軽微な修正
- ex)
  - `git commit -m "[feat] model group (#1)"`
  - `git commit -m "[fix] login page (#2)"`
