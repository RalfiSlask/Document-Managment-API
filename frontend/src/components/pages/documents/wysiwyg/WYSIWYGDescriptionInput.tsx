import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const WYSIWYGDescriptionInput = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { currentDocument, changeCurrentDocumentOnChange, isSaveEditButtonClicked } = documentsContext;

  if (!currentDocument) {
    return;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor="text">Description</label>
      </div>
      <input
        onChange={e => {
          changeCurrentDocumentOnChange(e, 'description');
        }}
        type="text"
        spellCheck="false"
        id="title"
        readOnly={isSaveEditButtonClicked ? true : false}
        placeholder="title"
        className={`${
          isSaveEditButtonClicked ? 'outline-none focus:none ' : 'focus:outline-[#A4FFAF] '
        } rounded-md pl-3 py-2 bg-inputBG text-textColor placeholder:text-placeholder`}
        value={currentDocument.description}
      />
    </div>
  );
};

export default WYSIWYGDescriptionInput;
