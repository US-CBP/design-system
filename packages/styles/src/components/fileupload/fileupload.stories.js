export default {
  title: 'Patterns/File Upload',
  argType: {},
};

const FileUploadTemplate = () => {
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

const UploadProgressTemplate = () => {
  return `
    <div class="cbp-form__upload">
      <span>super_duper-fun_times_at_the_beach.jpg</span>
      <button><i class="fa fa-times" aria-hidden="true"></i></button>
      <progress value="70" max="100">70 %</progress>
    </div>
  `;
};

const UploadErrorTemplate = () => {
  return `
    <div class="cbp-form__upload cbp-form__upload--error">
      <div>
        <span>super_duper-fun_times_at_the_beach.jpg</span>
        <button><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
      <hr>
      <span>
        <i class="fas fa-exclamation-triangle"></i>File size exceeds the limit.
      </span>
    </div>
  `;
};

export const FileUpload = FileUploadTemplate.bind({});
FileUpload.args = {};

export const UploadProgress = UploadProgressTemplate.bind({});
UploadProgress.args = {};

export const UploadError = UploadErrorTemplate.bind({});
UploadError.args = {};