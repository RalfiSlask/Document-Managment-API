import { IDocumentObjectType } from '../../../utils/types/types';

type DocumentPropsType = {
  document: IDocumentObjectType;
};

const DocumentComponent: React.FC<DocumentPropsType> = ({ document }) => {
  const { description, title } = document;

  return (
    <div className="w-[300px] h-[200px] border border-solid border-red-300 py-2 px-4">
      <h2 className="font-bold text-xl">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DocumentComponent;
