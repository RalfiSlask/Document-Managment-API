import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';

const WYSIWYGTitleInput = () => {
  const documentsContext = useContext(DocumentsContext);

  if (!documentsContext) {
    return;
  }

  const { currentDocument, changeCurrentDocumentOnChange, isEditModeEnabled } = documentsContext;

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
        readOnly={isEditModeEnabled ? true : false}
        type="text"
        spellCheck="false"
        id="title"
        placeholder="title"
        className={`${
          isEditModeEnabled ? 'outline-none focus:none bg-[#24232C] w-[400px]' : 'focus:outline-[#A4FFAF] '
        } rounded-md pl-3 py-2 bg-[#222f3e] text-textColor placeholder:text-placeholder w-[400px]`}
        value={currentDocument.title}
      />
    </div>
  );
};

export default WYSIWYGTitleInput;
