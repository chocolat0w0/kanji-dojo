import { useState, VFC } from 'react';
import { uuid } from 'uuidv4';
import { Kanji } from '../data/KanjiList';

const CheckBox: VFC<{
  id: string;
  name: string;
  label: string;
  checked?: boolean;
}> = ({ id, name, label, checked = false }) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      {label}
    </label>
  );
};

const KanjiCheckList: VFC<{ list: Kanji[] }> = ({ list }) => (
  <form>
    {list.map((l) => {
      const id = uuid();

      return <CheckBox id={id} name="kanji" label={l.ji} key={id} />;
    })}
  </form>
);

export default KanjiCheckList;
