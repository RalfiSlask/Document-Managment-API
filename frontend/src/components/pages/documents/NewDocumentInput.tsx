import { INewDocumentFormInputValues } from '../../../utils/types/types';
import { getStringWithcapitalizedFirstLetter } from '../../../utils/types/helperfunctions';
import { useContext } from 'react';
import { DocumentsContext } from '../../../context/DocumentsContext';

type CreateNewDocumentProps = {
  text: string;
  inputKey: keyof INewDocumentFormInputValues;
  type: string;
};

const NewDocumentInput: React.FC<CreateNewDocumentProps> = ({ type, text, inputKey }) => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { newDocumentInputValues, handleDocumentFormInputOnChange, setFormSubmitted } = documentsContext;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={text}>{getStringWithcapitalizedFirstLetter(text)}</label>
      </div>
      <input
        onInput={e => handleDocumentFormInputOnChange(inputKey, e, setFormSubmitted)}
        type={type}
        spellCheck="false"
        id={text}
        placeholder={text}
        className="input"
        value={newDocumentInputValues[inputKey]}
      />
    </div>
  );
};

export default NewDocumentInput;
