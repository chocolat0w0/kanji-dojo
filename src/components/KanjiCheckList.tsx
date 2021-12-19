import { Box } from '@material-ui/core';
import { VFC } from 'react';
import { Kanji } from '../data/KanjiList';
import CheckBox from './CheckBox';

const KanjiCheckList: VFC<{
  list: Kanji[];
  checkedList: string[];
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ list, checkedList, handleChange }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }} component="form">
    {list.map((l) => (
      <CheckBox
        id={l.id}
        name="kanji"
        label={l.ji}
        checkedList={checkedList}
        key={l.id}
        handleChange={handleChange}
      />
    ))}
  </Box>
);
export default KanjiCheckList;
