import { Typography } from '@material-ui/core';
import CheckBoxesParent from 'components/molecules/CheckBoxesParent';
import { VFC } from 'react';
import type KanjiType from '../../../data/KanjiListType';
import useGradeCheckList from './index.hooks';

const GradeCheckList: VFC<{
  grade: number;
  list: KanjiType[];
  checkedList: string[];
  handleChange: (checkedIds: string[]) => void;
}> = ({ grade, list, checkedList, handleChange }) => {
  const { gradeCheckedList, handleGradeChange, handleChildChange } =
    useGradeCheckList(checkedList, handleChange);

  return (
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
            handleChange: handleChildChange,
          }))}
          childCheckedList={gradeCheckedList}
          handleChange={handleGradeChange}
        />
      </Typography>
    </section>
  );
};
export default GradeCheckList;
