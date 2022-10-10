import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';
import { useState } from 'react';

type IdStatusType = { id: string; status: CheckedType };

const useGradeCheckList = (
  statusList: IdStatusType[],
  handleChange: (gradeCheckedList: IdStatusType[]) => void,
): {
  handleGradeChange: (childCheckedList: typeof statusList) => void;
  handleChildChange: (id: string, status: CheckedType) => void;
} => {
  const [_, setGradeCheckedList] = useState(statusList);

  const handleGradeChange = (childCheckedList: IdStatusType[]) => {
    setGradeCheckedList(() => {
      handleChange(childCheckedList);

      return childCheckedList;
    });
  };

  const handleChildChange = (id: string, status: CheckedType) => {
    setGradeCheckedList((prev) => {
      const newCheckedList = [
        ...prev.filter((l) => l.id !== id),
        { id, status },
      ];

      handleChange(newCheckedList);

      return newCheckedList;
    });
  };

  return { handleGradeChange, handleChildChange };
};

export type { IdStatusType };
export default useGradeCheckList;
