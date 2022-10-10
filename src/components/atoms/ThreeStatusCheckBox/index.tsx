import { Checkbox, FormControlLabel } from '@material-ui/core';
import { memo, useMemo, VFC } from 'react';

export const CheckedType = {
  FALSE: 'false',
  MUST: 'must',
  USABLE: 'usable',
} as const;
export type CheckedType = typeof CheckedType[keyof typeof CheckedType];

type CheckBoxType = {
  id: string;
  name: string;
  label: string;
  status?: CheckedType;
  handleChange: (id: string, status: CheckedType) => void;
};

const areEqual = (prev: CheckBoxType, next: CheckBoxType) =>
  prev.id === next.id && prev.status === next.status;

const ThreeStatusCheckBox: VFC<CheckBoxType> = ({
  id,
  name,
  label,
  status = CheckedType.FALSE,
  handleChange,
}) => {
  const onChange = (_: React.ChangeEvent<HTMLInputElement>) => {
    switch (status) {
      case CheckedType.FALSE:
        handleChange(id, CheckedType.USABLE);
        break;

      case CheckedType.USABLE:
        handleChange(id, CheckedType.MUST);
        break;

      case CheckedType.MUST:
        handleChange(id, CheckedType.FALSE);
        break;

      default:
        break;
    }
  };

  const style = useMemo(
    () => (status === CheckedType.MUST ? { color: 'red' } : {}),
    [status],
  );

  return (
    <FormControlLabel
      label={label}
      style={style}
      control={
        <Checkbox
          name={name}
          checked={status === CheckedType.MUST || status === CheckedType.USABLE}
          onChange={onChange}
          size="small"
        />
      }
    />
  );
};

export type { CheckBoxType };
export default memo(ThreeStatusCheckBox, areEqual);
