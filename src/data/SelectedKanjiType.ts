import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';

export type SelectedStatusType = {
  id: string;
  grade: number;
  status: CheckedType;
};

export type SelectedKanjiType = {
  ji: string;
  status: CheckedType;
};
