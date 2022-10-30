import { Box, Button, Typography } from '@material-ui/core';
import KanjiSelector from 'components/organisms/KanjiSelector';
import WithHeader from 'components/templates/WithHeader';
import { VFC } from 'react';
import { SelectedKanjiType, SelectedStatusType } from 'data/SelectedKanjiType';
import { Link } from 'react-router-dom';

const Select: VFC<{
  statusList: SelectedStatusType[];
  setStatusList: React.Dispatch<React.SetStateAction<SelectedStatusType[]>>;
  setSelectedKanjiList: React.Dispatch<
    React.SetStateAction<SelectedKanjiType[]>
  >;
}> = ({ statusList, setStatusList, setSelectedKanjiList }) => (
  <WithHeader>
    {/* 漢字を学習年別に表示 */}
    <Box component="section">
      <Typography variant="h4" gutterBottom component="h1">
        漢字リスト
      </Typography>
      <KanjiSelector
        statusList={statusList}
        setStatusList={setStatusList}
        setSelectedKanji={setSelectedKanjiList}
      />
    </Box>

    <Button component={Link} to="/question" variant="contained">
      問題を作成する
    </Button>
  </WithHeader>
);

export default Select;
