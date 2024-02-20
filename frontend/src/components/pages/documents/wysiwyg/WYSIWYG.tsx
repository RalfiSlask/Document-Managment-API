import { Editor } from '@tinymce/tinymce-react';
import { useState, useContext, useEffect } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';
import WYSIWYGTitleInput from './WYSIWYGTitleInput';
import WYSIWYGDescriptionInput from './WYSIWYGDescriptionInput';
import WYSIWYGAbortButton from './WYSIWYGAbortButton';
import WYSIWYGEditSaveButton from './WYSIWYGEditSaveButton';
import WYSIWYGOpenDeleteModalButton from './WYSIWYGOpenDeleteModalButton';

const WYSIWYG = () => {
  const [editorContent, setEditorContent] = useState('');
  const documentsContext = useContext(DocumentsContext);
  const key = import.meta.env.VITE_WYSIWYG_KEY;

  if (!documentsContext) {
    return;
  }

  const { setCurrentDocument, currentDocument } = documentsContext;

  const handleChangeOnEditor = (content: string) => {
    console.log(content);
    setEditorContent(content);
  };

  useEffect(() => {
    if (currentDocument?.content) {
      setEditorContent(currentDocument?.content);
    }
  }, []);

  useEffect(() => {
    setCurrentDocument(prev => {
      if (prev) {
        return { ...prev, content: editorContent };
      } else {
        return prev;
      }
    });
  }, [editorContent, setCurrentDocument]);

  return (
    <section className="flex gap-4">
      <WYSIWYGAbortButton />
      <div className="flex flex-col items-center gap-10">
        <WYSIWYGTitleInput />
        <WYSIWYGDescriptionInput />
        <Editor
          apiKey={key}
          init={{
            plugins:
              'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            height: '500px',
          }}
          initialValue={editorContent}
          onEditorChange={handleChangeOnEditor}
        />
      </div>
      <div className="bg-secondaryBG rounded-md w-[300px] h-[800px] py-6 px-6">
        <div className="flex flex-col items-end gap-6">
          <WYSIWYGEditSaveButton />
          <WYSIWYGOpenDeleteModalButton />
        </div>
      </div>
    </section>
  );
};

export default WYSIWYG;
