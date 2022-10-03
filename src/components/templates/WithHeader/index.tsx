import React, { FC } from 'react';
import { Box } from '@material-ui/core';

const WithHeader: FC = ({ children }) => (
  <>
    <header className="App-header">
      <h1>漢字道場</h1>
    </header>
    <Box component="main" p="30px">
      {children}
    </Box>
  </>
);

export default WithHeader;
