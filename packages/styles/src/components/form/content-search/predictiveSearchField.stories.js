export default {
  title: 'Patterns/Form/Content Search Fields'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <label for="password" class="cbp-form__label">Search</label>
      <span class="cbp-form__description cbp-form__description--error" hidden><i class="fas fa-exclamation-triangle"></i>&nbsp;This password does not match our records</span>
      <form>
        <div class="cbp-field-group">
          <input type="text" name="autocomplete-demo" id="autocomplete-demo" placeholder="Enter Search Criteria" autocomplete="off"></input>
          <button type="button" class="square">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <ul class="cbp-autocomplete">
          <li class="cbp-autocomplete__item">Uganda</li>
          <li class="cbp-autocomplete__item">United States of America</li>
          <li class="cbp-autocomplete__item">United Emerites</li>
        </ul>
      </form>
    </div>
  `
}

export const WithPredictiveSearch = Template.bind({});
WithPredictiveSearch.args = {};