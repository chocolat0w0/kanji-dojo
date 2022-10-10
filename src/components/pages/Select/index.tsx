import { Box, Typography } from '@material-ui/core';
import QuestionList from 'components/organisms/QuestionList';
import KanjiSelector from 'components/organisms/KanjiSelector';
import WithHeader from 'components/templates/WithHeader';
import { useState, VFC } from 'react';
import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';
import { SelectedKanjiType } from 'components/organisms/KanjiSelector/index.hooks';

const Select: VFC = () => {
  const [selectedKanjiList, setSelectedKanjiList] = useState<
    SelectedKanjiType[]
  >([]);

  return (
    <WithHeader>
      {/* 漢字を学習年別に表示 */}
      <>
        <Box component="section">
          <Typography variant="h4" gutterBottom component="h1">
            漢字リスト
          </Typography>
          <KanjiSelector setSelectedKanji={setSelectedKanjiList} />
        </Box>

        {/* 学習対象にした漢字を表示 (検証用、最後に削除) */}
        <section>
          <h1>選んだ漢字</h1>
          {selectedKanjiList.map((s) => s.ji).join(' ')}
        </section>

        {/* 学習対象の漢字の問題文を表示 */}
        <Box component="section" mt="30px">
          <Typography variant="h4" gutterBottom component="h1">
            問題文
          </Typography>
          <QuestionList
            must={selectedKanjiList
              .filter((s) => s.status === CheckedType.MUST)
              .map((s) => s.ji)}
            usable={selectedKanjiList
              .filter((s) => s.status === CheckedType.USABLE)
              .map((s) => s.ji)}
          />
        </Box>
      </>
    </WithHeader>
  );
};

export default Select;
