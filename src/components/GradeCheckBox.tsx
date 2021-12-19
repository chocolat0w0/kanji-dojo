import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Kanji } from 'data/KanjiList';
import { VFC } from 'react';

const GradeCheckBox: VFC<{
  id: string;
  name: string;
  label: string;
  gradeList: Kanji[];
  checkedList: string[];
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ id, name, label, gradeList, checkedList, handleChange }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(id, e.target.checked);
  };

  const hasAllChecked = gradeList.every((l) => checkedList.includes(l.id));
  const hasSomeChecked = gradeList.some((l) => checkedList.includes(l.id));

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          name={name}
          checked={hasAllChecked}
          indeterminate={hasSomeChecked && !hasAllChecked}
          onChange={onChange}
        />
      }
    />
  );
};

export default GradeCheckBox;
