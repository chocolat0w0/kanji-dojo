import { Box, Typography } from '@material-ui/core';
import KanjiCountList from 'components/organisms/KanjiCounter';
import WithHeader from 'components/templates/WithHeader';
import React, { VFC } from 'react';

const Count: VFC = () => (
  <WithHeader>
    {/* 漢字を学習年別に表示 */}
    <Box component="section">
      <Typography variant="h4" gutterBottom component="h1">
        漢字リスト
      </Typography>
      <KanjiCountList />
    </Box>
  </WithHeader>
);

export default Count;
