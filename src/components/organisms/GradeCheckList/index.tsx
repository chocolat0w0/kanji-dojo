import { Typography } from '@material-ui/core';
import CheckBoxesParent from 'components/molecules/CheckBoxesParent';
import { useState, VFC } from 'react';
import { Kanji } from '../../../data/KanjiList';

const GradeCheckList: VFC<{
  grade: number;
  list: Kanji[];
  checkedList: string[];
  handleChange: (grade: number, checkedIds: string[]) => void;
}> = ({ grade, list, checkedList, handleChange }) => {
  const [gradeCheckedList, setGradeCheckedList] = useState(checkedList);

  const handleGradeChange = (childCheckedList: string[]) => {
    setGradeCheckedList((_) => childCheckedList);
    handleChange(grade, childCheckedList);
  };

  const handleChildChange = (id: string, isChecked: boolean) => {
    const newCheckedList = isChecked
      ? [...new Set([...gradeCheckedList, id])]
      : gradeCheckedList.filter((x) => x !== id);
    setGradeCheckedList((_) => newCheckedList);
    handleChange(grade, newCheckedList);
  };

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
