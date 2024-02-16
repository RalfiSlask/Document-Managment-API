import { INewDocumentFormInputValues } from '../../../utils/types/types';
import NewDocumentInput from './NewDocumentInput';
import SubmitButton from '../../shared/SubmitButton';
import NewDocumentResetButton from './NewDocumentResetButton';
import { useContext, useEffect } from 'react';
import { DocumentsContext } from '../../../context/DocumentsContext';
import { LoginContext } from '../../../context/LoginContext';

const inputs = [
  { id: 1, type: 'text', text: 'title', inputKey: 'title' as keyof INewDocumentFormInputValues },
  { id: 2, type: 'text', text: 'description', inputKey: 'description' as keyof INewDocumentFormInputValues },
];

const NewDocumentForm = () => {
  const documentsContext = useContext(DocumentsContext);
  const loginContext = useContext(LoginContext);

  if (!documentsContext || !loginContext) {
    return;
  }

  const { documentErrorMessage, handleNewDocumentSubmit } = documentsContext;
  const { userId } = loginContext;

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  return (
    <form
      onSubmit={e => {
        handleNewDocumentSubmit(e, userId);
      }}
      id="formInput"
      className="flex flex-col gap-4 w-[400px] items-center"
    >
      <div className="text-error">{documentErrorMessage}</div>
      {inputs.map(input => {
        const { id, type, text, inputKey } = input;
        return <NewDocumentInput key={id} type={type} text={text} inputKey={inputKey} />;
      })}

      <div className="flex justify-center gap-4">
        <SubmitButton title={'Create New Document'} />
        <NewDocumentResetButton />
      </div>
    </form>
  );
};

export default NewDocumentForm;
