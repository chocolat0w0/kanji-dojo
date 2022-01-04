import { useState } from 'react';

const useGradeCheckList = (
  checkedList: string[],
  handleChange: (checkedIds: string[]) => void,
): {
  gradeCheckedList: string[];
  handleGradeChange: (childCheckedList: string[]) => void;
  handleChildChange: (id: string, isChecked: boolean) => void;
} => {
  const [gradeCheckedList, setGradeCheckedList] = useState(checkedList);

  const handleGradeChange = (childCheckedList: string[]) => {
    setGradeCheckedList(() => {
      handleChange(childCheckedList);

      return childCheckedList;
    });
  };

  const handleChildChange = (id: string, isChecked: boolean) => {
    setGradeCheckedList((prev) => {
      const newCheckedList = isChecked
        ? [...new Set([...prev, id])]
        : prev.filter((x) => x !== id);

      handleChange(newCheckedList);

      return newCheckedList;
    });
  };

  return { gradeCheckedList, handleGradeChange, handleChildChange };
};

export default useGradeCheckList;
