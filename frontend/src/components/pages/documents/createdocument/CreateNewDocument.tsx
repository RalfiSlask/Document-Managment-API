import NewDocumentForm from './NewDocumentForm';
import DocumentGoBackButton from './DocumentGoBackButton';

const CreateNewDocument = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <DocumentGoBackButton />
      <NewDocumentForm />
    </div>
  );
};

export default CreateNewDocument;
