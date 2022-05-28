# 問題文生成方法

1. `tools/fetch_morph_api/exam_list.json` に例文を追記します。
1. `tools/fetch_morph_api/README.md` に従って形態素解析にかけます。
1. `tools/fetch_morph_api/out/exam_list_morph.json` をエディタで開いて、追加分を `tools/make_example_list/exam_list_morph.json` にコピペします。
1. `tools/make_example_list/exam_list_morph.json` を確認して、`tools/make_example_list/README.md` に従ってファイル内容を整形して問題文を出力します。
1. `public/assets/json/exam_list.json` に追加分をコピペします。
