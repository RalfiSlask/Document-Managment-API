import { IDocumentObjectType } from '../../../../utils/types/types';
import EditButton from './EditButton';
import OpenDeleteModalButton from './OpenDeleteModalButton';

type DocumentPropsType = {
  document: IDocumentObjectType;
  number: number;
};

const DocumentComponent: React.FC<DocumentPropsType> = ({ document, number }) => {
  const { description, title, document_id } = document;

  return (
    <div className="relative w-[300px] h-[300px] border border-solid bg-secondaryBG rounded-md py-4 px-4 document-container">
      <div className="flex justify-between">
        <p className="text-xl">{number}</p>
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
