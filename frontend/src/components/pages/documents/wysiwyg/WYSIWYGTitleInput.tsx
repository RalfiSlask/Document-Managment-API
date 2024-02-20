import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const WYSIWYGTitleInput = () => {
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
        <label htmlFor="text">Title</label>
      </div>
      <input
        onChange={e => {
          changeCurrentDocumentOnChange(e, 'title');
        }}
        readOnly={isSaveEditButtonClicked ? true : false}
        type="text"
        spellCheck="false"
        id="title"
        placeholder="title"
        className={`${
          isSaveEditButtonClicked ? 'outline-none focus:none ' : 'focus:outline-[#A4FFAF] '
        } rounded-md pl-3 py-2 bg-inputBG text-textColor placeholder:text-placeholder`}
        value={currentDocument.title}
      />
    </div>
  );
};

export default WYSIWYGTitleInput;
