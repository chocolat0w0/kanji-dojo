import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import ThreeStatusCheckBox, {
  CheckBoxType,
  CheckedType,
} from 'components/atoms/ThreeStatusCheckBox';
import { IdStatusType } from 'components/organisms/GradeCheckList/index.hooks';
import { VFC } from 'react';

const CheckBoxesParent: VFC<{
  id: string;
  name: string;
  label: string;
  childList: CheckBoxType[];
  handleChange: (childCheckedList: IdStatusType[]) => void;
}> = ({ id, name, label, childList, handleChange }) => {
  const onChangeParent = (_: React.ChangeEvent<HTMLInputElement>) => {
    if (childList.every((l) => l.status === CheckedType.MUST)) {
      // 全must→ 全false
      handleChange(
        childList.map((l) => ({ id: l.id, status: CheckedType.FALSE })),
      );
    } else if (childList.some((l) => l.status === CheckedType.FALSE)) {
      // 一部でも false → 全usable
      handleChange(
        childList.map((l) => ({ id: l.id, status: CheckedType.USABLE })),
      );
    } else {
      // それ以外(全 usable or must) → 全usable
      handleChange(
        childList.map((l) => ({ id: l.id, status: CheckedType.MUST })),
      );
    }
  };

  const hasAllChecked = childList.every(
    (l) => l.status === CheckedType.MUST || l.status === CheckedType.USABLE,
  );
  const hasSomeChecked = childList.some(
    (l) => l.status === CheckedType.MUST || l.status === CheckedType.USABLE,
  );

  const style = childList.every((l) => l.status === CheckedType.MUST)
    ? { color: 'red' }
    : {};

  return (
    <>
      <FormControlLabel
        label={label}
        style={style}
        control={
          <Checkbox
            id={id}
            name={name}
            checked={hasAllChecked}
            indeterminate={hasSomeChecked && !hasAllChecked}
            onChange={onChangeParent}
          />
        }
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}
        component="form"
      >
        {childList.map((l) => (
          <ThreeStatusCheckBox
            id={l.id}
            name={l.name}
            label={l.label}
            status={l.status}
            key={l.id}
            handleChange={l.handleChange}
          />
        ))}
      </Box>
    </>
  );
};

export default CheckBoxesParent;
