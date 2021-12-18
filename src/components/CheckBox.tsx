import { VFC } from 'react';

const CheckBox: VFC<{
  id: string;
  name: string;
  label: string;
  checkedList: string[];
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ id, name, label, checkedList, handleChange }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(id, e.target.checked);
  };

  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checkedList.includes(id)}
        onChange={(e) => onChange(e)}
      />
      {label}
    </label>
  );
};

export default CheckBox;
