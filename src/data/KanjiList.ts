type OnyomiType = {
  yomi: string;
  okuri?: string;
};
type KanjiType = {
  id: string;
  ji: string;
  kun: string[];
  on: OnyomiType[];
  grade: number;
};
export default KanjiType;
