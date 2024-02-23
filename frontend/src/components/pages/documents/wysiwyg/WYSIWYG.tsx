import { Editor } from '@tinymce/tinymce-react';
import { useContext } from 'react';
import { DocumentsContext } from '../../../../context/DocumentsContext';
import WYSIWYGTitleInput from './WYSIWYGTitleInput';
import WYSIWYGDescriptionInput from './WYSIWYGDescriptionInput';
import WYSIWYGGoBackButton from './WYSIWYGGoBackButton';
import WYSIWYGEditSaveButton from './WYSIWYGEditSaveButton';
import WYSIWYGOpenDeleteModalButton from './WYSIWYGOpenDeleteModalButton';
import WYSIWYGLightbox from './WYSIWYGLightbox';
import WYSIWYGAbortButton from './WYSIWYGAbortButton';

const WYSIWYG = () => {
  const documentsContext = useContext(DocumentsContext);
  const key = import.meta.env.VITE_WYSIWYG_KEY;

  if (!documentsContext) {
    return;
  }

  const { isEditModeEnabled, initValue, successMessage, handleChangeOnEditor } = documentsContext;

  return (
    <section className="flex gap-4">
      <WYSIWYGGoBackButton />
      <div className="flex flex-col items-center gap-10">
        <WYSIWYGTitleInput />
        <WYSIWYGDescriptionInput />
        <div className="relative">
          {isEditModeEnabled && <WYSIWYGLightbox />}
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
              skin: 'oxide-dark',
              content_css: 'dark',
            }}
            initialValue={initValue}
            onEditorChange={handleChangeOnEditor}
          />
        </div>
      </div>
      <div className="bg-secondaryBG rounded-md w-[330px] h-[703px] py-6 px-6">
        <p className="absolute top-32 left-[500px]">{successMessage}</p>
        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-2">
            {!isEditModeEnabled && <WYSIWYGAbortButton />}
            <WYSIWYGEditSaveButton />
          </div>
          <WYSIWYGOpenDeleteModalButton />
        </div>
      </div>
    </section>
  );
};

export default WYSIWYG;
