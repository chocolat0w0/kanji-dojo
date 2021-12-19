import { Checkbox, FormControlLabel } from '@material-ui/core';
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
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          name={name}
          checked={checkedList.includes(id)}
          onChange={onChange}
          size="small"
        />
      }
    />
  );
};

export default CheckBox;
