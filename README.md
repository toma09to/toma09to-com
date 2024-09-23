# toma09to.com

toma09to.comのサイトです。
スタンドアローンで動作するのでどんなサーバーでも動作します。

## 使用方法

- イメージのビルド
```sh
docker build -t toma09to-com .
```

- コンテナの実行
```sh
docker run --rm -d -p 4321:4321 --name toma09to-com toma09to-com
```

- コンテナの終了
```sh
docker stop toma09to-com
```