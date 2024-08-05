# gpt-logprobs

ハッカソン2024/8 で作成

# branch 名の統一

-   main ブランチ
    -   本番用ブランチ
-   feat/[NAME]/[ISUEE_NUM]/[TITLE]
    -   機能の追加や変更などを行うブランチ，develop ブランチから派生
    -   ex) feat/dodo/1-create-view-env
-   fix/[NAME]/[ISUEE_NUM]/[TITLE]
    -   バグの修正などを行うブランチ，develop ブランチから派生
    -   ex) fix/dodo/2-fix-view-env

# コミットの命名規則

-   コミットメッセージは issue 番号を載せる
-   コミットメッセージは行った開発を端的にわかりやすく書く（長すぎないように注意する）
-   コミットメッセージラベルを付ける
    -   [feat] file or directory の追加
    -   [fix] file or directory のバグや軽微な修正
-   ex)
    -   `git commit -m "[feat] model group (#1)"`
    -   `git commit -m "[fix] login page (#2)"`
