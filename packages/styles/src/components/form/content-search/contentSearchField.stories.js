export default {
  title: 'Patterns/Form/Content Search Fields'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="password" class="cbp-form__label">Search</label>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This password does not match our records</span>
      <div class="cbp-field-group" id="demo-square-button-field">
        <input type="text" name="tag" id="tag" placeholder="Enter Search Criteria"></input>
        <button type="button" class="square">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  `
}

export const Default = Template.bind({});
Default.args = {};