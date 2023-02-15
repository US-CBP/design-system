export default {
  title: 'Patterns/File Upload',
  argType: {},
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper" id="fileupload-demo">
      <label class="cbp-form__label">Upload Files</label>
      <label class="cbp-form__label cbp-form__label--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;Upload Files</label>
      <span class="cbp-form__description">Accepted files: .doc, .docx, .pdf, .jpg, .png, .gif. Max File size 10mb per
        file. Up to 5 files may be uploaded.</span>
      <label for="file-upload-demo" class="cbp-form__file">
        <i class="fas fa-file-alt"></i>
        Drag & Drop Files Here or
        <button class="cbp-btn cbp-btn__secondary" tabindex="-1">
          <i class="fas fa-upload"></i>
          browse
        </button>
        <input type="file" name="file-upload-demo" id="file-upload-demo" multiple>
      </label>
    </div>
  `;
};

export const FileUpload = Template.bind({});
FileUpload.args = {};
