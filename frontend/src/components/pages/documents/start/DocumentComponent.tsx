import { IDocumentObjectType } from '../../../../utils/types/types';
import EditButton from './EditButton';
import OpenDeleteModalButton from './OpenDeleteModalButton';
import documentLogo from '../../../../assets/icons/document-white.svg';

type DocumentPropsType = {
  document: IDocumentObjectType;
  number: number;
};

const DocumentComponent: React.FC<DocumentPropsType> = ({ document, number }) => {
  const { description, title, document_id } = document;

  return (
    <div className="relative w-[300px] h-[300px] flex flex-col gap-4 bg-secondaryBG rounded-md py-4 px-4 document-container shadow-custom">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 border-b border-solid border-textColor pb-4 w-full">
          <img src={documentLogo} alt="" width="25" height="25" />
          <p className="text-xl">{number}</p>
        </div>
        <div>
          <OpenDeleteModalButton documentId={document_id} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">{title}</h2>
        <p>{description}</p>
      </div>
      <div>
        <EditButton documentId={document_id} />
      </div>
    </div>
  );
};

export default DocumentComponent;
