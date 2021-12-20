import { Checkbox, FormControlLabel } from '@material-ui/core';
import { VFC } from 'react';

type CheckBoxType = {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  handleChange: (id: string, isChecked: boolean) => void;
};

const CheckBox: VFC<CheckBoxType> = ({
  id,
  name,
  label,
  checked = false,
  handleChange,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(id, e.target.checked);
  };

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={onChange}
          size="small"
        />
      }
    />
  );
};

export type { CheckBoxType };
export default CheckBox;
