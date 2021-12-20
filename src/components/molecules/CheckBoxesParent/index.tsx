import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import CheckBox, { CheckBoxType } from 'components/atoms/CheckBox';
import { VFC } from 'react';

const CheckBoxesParent: VFC<{
  id: string;
  name: string;
  label: string;
  childList: CheckBoxType[];
  checkedList: string[];
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ id, name, label, childList, checkedList, handleChange }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(id, e.target.checked);
  };

  const hasAllChecked = childList.every((l) => checkedList.includes(l.id));
  const hasSomeChecked = childList.some((l) => checkedList.includes(l.id));

  return (
    <>
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
      <Box
        sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}
        component="form"
      >
        {childList.map((l) => (
          <CheckBox
            id={l.id}
            name={l.name}
            label={l.label}
            checked={checkedList.includes(l.id)}
            key={l.id}
            handleChange={l.handleChange}
          />
        ))}
      </Box>
    </>
  );
};

export default CheckBoxesParent;
