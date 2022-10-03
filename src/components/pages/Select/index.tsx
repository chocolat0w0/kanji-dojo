import { Box, Typography } from '@material-ui/core';
import ExampleList from 'components/organisms/ExampleList';
import TargetKanjiSelector from 'components/organisms/TargetKanjiSelector';
import WithHeader from 'components/templates/WithHeader';
import React, { useState, VFC } from 'react';

const Select: VFC = () => {
  const [checkedKanjiList, setCheckedKanjiList] = useState<string[]>([]);
  const setCheckedKanji = (list: string[]) => {
    setCheckedKanjiList(() => list);
  };

  return (
    <WithHeader>
      {/* 漢字を学習年別に表示 */}
      <>
        <Box component="section">
          <Typography variant="h4" gutterBottom component="h1">
            漢字リスト
          </Typography>
          <TargetKanjiSelector setCheckedKanji={setCheckedKanji} />
        </Box>

        {/* 学習対象にした漢字を表示 (検証用、最後に削除) */}
        <section>
          <h1>選んだ漢字</h1>
          {checkedKanjiList.join(' ')}
        </section>

        {/* 学習対象の漢字の問題文を表示 */}
        <Box component="section" mt="30px">
          <Typography variant="h4" gutterBottom component="h1">
            問題文
          </Typography>
          <ExampleList targetList={checkedKanjiList} />
        </Box>
      </>
    </WithHeader>
  );
};

export default Select;
