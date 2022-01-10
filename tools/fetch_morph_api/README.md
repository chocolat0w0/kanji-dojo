## 概要
文章を[形態素解析API](https://labs.goo.ne.jp/api/jp/morphological-analysis/)にかけます。

## 準備
```
> npm install
```

1. `exam_list.json`というファイルを作成し、問題文リストを保存します。
```
["漢字が混ざっている文章。", "花が一つ咲いた。", "今日のご飯は焼き魚です。"]
```

## 実行
```
> npm run exec
```

`out/exam_list_morph.json`にAPIの結果が保存されます。

この時、すでにAPI実行済みの文章については処理がスキップされます。
再度APIを実行したい場合は、該当の文章を`out/exam_list_morph.json`から削除してから実行してください。
