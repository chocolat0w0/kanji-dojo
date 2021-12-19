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

  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={gradeList.every((l) => checkedList.includes(l.id))}
        onChange={(e) => onChange(e)}
      />
      {label}
    </label>
  );
};

export default GradeCheckBox;
