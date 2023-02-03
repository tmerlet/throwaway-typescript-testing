import React, {
  ChangeEventHandler,
  MouseEventHandler,
  RefObject,
  useRef,
  useState,
} from 'react';
import { MdAlarmAdd } from 'react-icons/md';

interface IAddWordProps {
  onWordAdd?: (value: string | undefined) => void;
}

const AddWord = ({ onWordAdd }: IAddWordProps) => {
  const inputEl: RefObject<HTMLInputElement> | null = useRef(null);
  const [newWord, setNewWord] = useState('');
  const [disable, setDisable] = useState(true);

  const onAddClicked: MouseEventHandler<HTMLButtonElement> = () => {
    onWordAdd?.(newWord);
    setNewWord('');
  };

  const isInvalidWord = newWord.length < 2 || /\s/.test(newWord);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setNewWord(value);
  };

  return (
    <>
      <input
        type="text"
        name="new"
        required
        pattern="[Bb]anana|[Cc]herry"
        ref={inputEl}
        placeholder="Add word..."
        value={newWord}
        onChange={onChange}
        data-testid="add-word-input"
      />
      <button
        onClick={onAddClicked}
        disabled={isInvalidWord}
        data-testid="add-word-button"
      >
        <MdAlarmAdd />
      </button>
    </>
  );
};

export default AddWord;
