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
    setGradeCheckedList((_) => childCheckedList);
    handleChange(childCheckedList);
  };

  const handleChildChange = (id: string, isChecked: boolean) => {
    const newCheckedList = isChecked
      ? [...new Set([...gradeCheckedList, id])]
      : gradeCheckedList.filter((x) => x !== id);
    setGradeCheckedList((_) => newCheckedList);
    handleChange(newCheckedList);
  };

  return { gradeCheckedList, handleGradeChange, handleChildChange };
};

export default useGradeCheckList;
