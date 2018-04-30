isbn-collector
========================================

ねっとさーふぃん中に見つけたISBNをメモしておいてくれる子です。

## 使ってみる

[Chromeウェブストア](https://chrome.google.com/webstore/detail/isbn-collector/jjjkfbknnpdhaimekmmnendlbeimgiol?hl=ja)から入手できます。

## メモ

### ISBNの拾い方

HTMLに登場した「それっぽい数字の羅列」をISBN扱いしています。

- ISBN10: 4で始まる（日本だけ）かつチェックディジットが一致するもの
- ISBN13: 9784で始まる（日本だけ）

### 書名の解決

[openBD](https://openbd.jp/) を使用しています。
取得できないものは `{ISBNっぽい数字} ?` が表示されます。

### Amazonリンク

それっぽいページを開いてみるだけです。
たまに当たります。

## License

[Apache License 2.0](LICENSE)

