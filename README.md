# EDAR
EDAR [Easily decide on a restaurant]
周辺の人気店を表示してくれます。

# 必要ツール

* Docker

# 起動手順

1. .env.exampleファイルに必要な環境変数を設定
```
REACT_APP_USER=[ユーザー名]
REACT_APP_PASSWORD=[パスワード]
REACT_APP_URL=[APIのURL]
```

2. コマンドの実行
カレントディレクトリはEDARであること。
```
$ cd ./src/edar/
$ cp .env.exmple .env
$ cd ../../
$ docker-compose up -d --build
```

3. URLへアクセス
`http://localhost:3000`へアクセス
