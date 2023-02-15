export default {
  title: 'Patterns/File Upload',
  argType: {},
};

const Template = () => {
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

export const UploadProgressError = Template.bind({});
UploadProgressError.args = {};
