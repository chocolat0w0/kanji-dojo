import { Box, Button, Typography } from '@material-ui/core';
import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';
import QuestionList from 'components/organisms/QuestionList';
import WithHeader from 'components/templates/WithHeader';
import { SelectedKanjiType } from 'data/SelectedKanjiType';
import { useMemo, VFC } from 'react';

const Question: VFC<{
  selectedKanjiList: SelectedKanjiType[];
  changePrevMode: () => void;
}> = ({ selectedKanjiList, changePrevMode }) => {
  const must = useMemo(
    () =>
      selectedKanjiList
        .filter((s) => s.status === CheckedType.MUST)
        .map((s) => s.ji),
    [selectedKanjiList],
  );

  const usable = useMemo(
    () =>
      selectedKanjiList
        .filter((s) => s.status === CheckedType.USABLE)
        .map((s) => s.ji),
    [selectedKanjiList],
  );

  return (
    <WithHeader>
      <Box component="section" mt="30px">
        <Typography variant="h4" gutterBottom component="h1">
          問題文
        </Typography>
        <QuestionList must={must} usable={usable} />
      </Box>
      <Button onClick={changePrevMode} variant="contained">
        漢字を選び直す
      </Button>
    </WithHeader>
  );
};

export default Question;
