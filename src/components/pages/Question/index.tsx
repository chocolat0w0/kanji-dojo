import { Box, Button, TextField, Typography } from '@material-ui/core';
import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';
import QuestionList from 'components/organisms/QuestionList';
import WithHeader from 'components/templates/WithHeader';
import { SelectedKanjiType } from 'data/SelectedKanjiType';
import { useCallback, useMemo, useState, VFC } from 'react';
import { Link } from 'react-router-dom';

const Question: VFC<{
  selectedKanjiList: SelectedKanjiType[];
}> = ({ selectedKanjiList }) => {
  const [max, setMax] = useState(15);

  const handleChangeMax = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMax(Number(event.target.value));
    },
    [],
  );

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
        <TextField
          type="number"
          label="問題の数"
          onChange={handleChangeMax}
          value={max}
        />
        <QuestionList must={must} usable={usable} max={max} />
      </Box>
      <Button component={Link} to="/" variant="contained">
        漢字を選び直す
      </Button>
    </WithHeader>
  );
};

export default Question;
