import { useState, VFC } from 'react';
import { Kanji } from '../data/KanjiList';

const CheckBox: VFC<{
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ id, name, label, checked = false, handleChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    handleChange(id, e.target.checked);
  };

  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e)}
      />
      {label}
    </label>
  );
};

const KanjiCheckList: VFC<{
  list: Kanji[];
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ list, handleChange }) => (
  <form>
    {list.map((l) => (
      <CheckBox
        id={l.id}
        name="kanji"
        label={l.ji}
        key={l.id}
        handleChange={handleChange}
      />
    ))}
  </form>
);
export default KanjiCheckList;
