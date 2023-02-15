export default {
  title: 'Patterns/File Upload',
  argType: {},
};

const Template = () => {
  return `
    <div class="cbp-form__upload">
      <span>super_duper-fun_times_at_the_beach.jpg</span>
      <button><i class="fa fa-times" aria-hidden="true"></i></button>
      <progress value="70" max="100">70 %</progress>
    </div>
  `;
};

export const UploadProgress = Template.bind({});
UploadProgress.args = {};
