import { Typography } from '@material-ui/core';
import CheckBoxesParent from 'components/molecules/CheckBoxesParent';
import { VFC } from 'react';
import { Kanji } from '../../../data/KanjiList';

const KanjiCheckList: VFC<{
  grade: number;
  list: Kanji[];
  checkedList: string[];
  handleChange: (id: string, isChecked: boolean) => void;
  handleGradeChange: (id: string, isChecked: boolean) => void;
}> = ({ grade, list, checkedList, handleChange, handleGradeChange }) => (
  <section key={`grade${grade}`}>
    <Typography variant="h5" component="h1">
      <CheckBoxesParent
        id={`grade-${grade}`}
        name="grade"
        label={`${grade}年の漢字`}
        childList={list.map((l) => ({
          id: l.id,
          name: 'kanji',
          label: l.ji,
          handleChange,
        }))}
        checkedList={checkedList}
        handleChange={handleGradeChange}
      />
    </Typography>
  </section>
);
export default KanjiCheckList;
