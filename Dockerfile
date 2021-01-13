FROM node:12.16.1

# コンテナ内で作業するディレクトリを指定
WORKDIR /usr/src/edar

# ローカルファイルを全部作業用ディレクトリにコピー
COPY ./src/edar .
# パッケージのインストール
RUN yarn install
# コンテナを起動する際に実行されるコマンド
ENTRYPOINT [ "yarn", "start" ]
