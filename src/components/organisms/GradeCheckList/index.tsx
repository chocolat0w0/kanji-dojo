import { Typography } from '@material-ui/core';
import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';
import CheckBoxesParent from 'components/molecules/CheckBoxesParent';
import { VFC } from 'react';
import type KanjiType from '../../../data/KanjiListType';
import useGradeCheckList, { IdStatusType } from './index.hooks';

const GradeCheckList: VFC<{
  grade: number;
  list: KanjiType[];
  statusList: IdStatusType[];
  handleChange: (
    gradeCheckedList: { id: string; status: CheckedType }[],
  ) => void;
}> = ({ grade, list, statusList, handleChange }) => {
  const { handleGradeChange, handleChildChange } = useGradeCheckList(
    statusList,
    handleChange,
  );

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
            status: statusList.find((s) => s.id === l.id)?.status,
            handleChange: handleChildChange,
          }))}
          handleChange={handleGradeChange}
        />
      </Typography>
    </section>
  );
};

export default GradeCheckList;
