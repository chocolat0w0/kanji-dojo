import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import CheckBox, { CheckBoxType } from 'components/atoms/CheckBox';
import { CheckedType } from 'components/organisms/KanjiCheckList/index.hooks';
import { VFC } from 'react';

const CheckBoxesParent: VFC<{
  id: string;
  name: string;
  label: string;
  childList: CheckBoxType[];
  childCheckedList: string[];
  handleChange: (
    childCheckedList: { id: string; status: CheckedType }[],
  ) => void;
}> = ({ id, name, label, childList, childCheckedList, handleChange }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(
      e.target.checked
        ? childList.map((l) => ({ id: l.id, status: CheckedType.MUST }))
        : childList.map((l) => ({ id: l.id, status: CheckedType.FALSE })),
    );
  };

  const hasAllChecked = childList.every((l) => childCheckedList.includes(l.id));
  const hasSomeChecked = childList.some((l) => childCheckedList.includes(l.id));

  return (
    <>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            id={id}
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
            checked={childCheckedList.includes(l.id)}
            key={l.id}
            handleChange={l.handleChange}
          />
        ))}
      </Box>
    </>
  );
};

export default CheckBoxesParent;
