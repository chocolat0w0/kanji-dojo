import { VFC } from 'react';
import { Kanji } from '../data/KanjiList';
import CheckBox from './CheckBox';

const KanjiCheckList: VFC<{
  list: Kanji[];
  checkedList: string[];
  handleChange: (id: string, isChecked: boolean) => void;
}> = ({ list, checkedList, handleChange }) => (
  <form>
    {list.map((l) => (
      <CheckBox
        id={l.id}
        name="kanji"
        label={l.ji}
        checkedList={checkedList}
        key={l.id}
        handleChange={handleChange}
      />
    ))}
  </form>
);
export default KanjiCheckList;
