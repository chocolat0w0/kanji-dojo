import { Box, Button, Typography } from '@material-ui/core';
import KanjiSelector from 'components/organisms/KanjiSelector';
import WithHeader from 'components/templates/WithHeader';
import { VFC } from 'react';
import { SelectedKanjiType } from 'data/SelectedKanjiTyoe';

const Select: VFC<{
  setSelectedKanjiList: React.Dispatch<
    React.SetStateAction<SelectedKanjiType[]>
  >;
  changeNextMode: () => void;
}> = ({ setSelectedKanjiList, changeNextMode }) => (
  <WithHeader>
    {/* 漢字を学習年別に表示 */}
    <Box component="section">
      <Typography variant="h4" gutterBottom component="h1">
        漢字リスト
      </Typography>
      <KanjiSelector setSelectedKanji={setSelectedKanjiList} />
    </Box>

    <Button onClick={changeNextMode} variant="contained">
      問題を作成する
    </Button>
  </WithHeader>
);

export default Select;
