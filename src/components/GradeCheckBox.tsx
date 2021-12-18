import { useState, VFC } from 'react';

const GradeCheckBox: VFC<{
  id: string;
  name: string;
  label: string;
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ id, name, label, handleChange }) => {
  const [isChecked, setIsChecked] = useState(false);

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

export default GradeCheckBox;
