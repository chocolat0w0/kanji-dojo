import { useState } from 'react';
import { CheckedType } from '../TargetKanjiSelector/index.hooks';

const useGradeCheckList = (
  checkedList: { id: string; status: CheckedType }[],
  handleChange: (
    gradeCheckedList: { id: string; status: CheckedType }[],
  ) => void,
): {
  gradeCheckedList: typeof checkedList;
  handleGradeChange: (childCheckedList: typeof checkedList) => void;
  handleChildChange: (id: string, isChecked: boolean) => void;
} => {
  const [gradeCheckedList, setGradeCheckedList] = useState(checkedList);

  const handleGradeChange = (childCheckedList: typeof checkedList) => {
    setGradeCheckedList(() => {
      handleChange(childCheckedList);

      return childCheckedList;
    });
  };

  const handleChildChange = (id: string, isChecked: boolean) => {
    setGradeCheckedList((prev) => {
      const newCheckedList = [
        ...prev.filter((l) => l.id !== id),
        { id, status: isChecked ? CheckedType.MUST : CheckedType.FALSE },
      ];

      handleChange(newCheckedList);

      return newCheckedList;
    });
  };

  return { gradeCheckedList, handleGradeChange, handleChildChange };
};

export default useGradeCheckList;
