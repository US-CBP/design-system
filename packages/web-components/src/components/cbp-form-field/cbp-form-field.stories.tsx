export default {
  title: 'Components/Form Fields',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    fieldId: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    context : {
      control: 'select',
      options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    label: 'Field Label',
    description: 'Field description.',
  },
};

const TextInputTemplate = ({ label, description, fieldId, error, readonly, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <input type="text" name="textinput" ${value ? `value="${value}"` : ''}  ${readonly ? `readonly` : ''} ${disabled ? `disabled` : ''} />
    </cbp-form-field>
  `;
};

export const TextInput = TextInputTemplate.bind({});
TextInput.args = {
  value: '',
};


const TextareaTemplate = ({ label, description, fieldId, error, readonly, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <textarea name="textarea" ${readonly ? `readonly` : ''} ${disabled ? `disabled` : ''}>${value}</textarea>
    </cbp-form-field>
  `;
};

export const Textarea = TextareaTemplate.bind({});
Textarea.args = {
  value: '',
};



const SelectTemplate = ({ label, description, fieldId, error, disabled, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <select name="select" ${disabled ? `disabled` : ''}>
        <option value=""></option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <!--
        <optgroup label="Group A">
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
          <option value="6">Option 6</option>
          <option value="7">Option 7</option>
          <option value="8">Option 8</option>
          <option value="9">Option 9</option>
        </optgroup>
        <optgroup label="Group B">
          <option value="10">Option 10</option>
          <option value="11">Option 11</option>
          <option value="12">Option 12</option>
          <option value="13">Option 13</option>
          <option value="14">Option 14</option>
          <option value="15">Option 15</option>
          <option value="16">Option 16</option>
          <option value="17">Option 17</option>
          <option value="18">Option 18</option>
          <option value="19">Option 19</option>
          <option value="20">Option 20</option>
          <option value="21">Option 21</option>
          <option value="22">Option 22</option>
          <option value="23">Option 23</option>
          <option value="24">Option 24</option>
          <option value="25">Option 25</option>
          <option value="26">Option 26</option>
          <option value="27">Option 27</option>
          <option value="28">Option 28</option>
        </optgroup>
        -->
      </select>
    </cbp-form-field>
  `;
};

export const Select = SelectTemplate.bind({});
Select.args = {
  
};

/* //For testing purposes only
const MultiSelectTemplate = ({ label, description, fieldId, error, disabled, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <select name="select" size="5" multiple ${disabled ? `disabled` : ''}>
        <option value=""></option>
        <option value="1">Option 1</option>
        <hr />
        <option value="2">Option 2</option>
        <hr />
        <option value="3">Option 3</option>
        <hr />
        <optgroup label="Group A">
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
          <option value="6">Option 6</option>
          <option value="7">Option 7</option>
          <option value="8">Option 8</option>
          <option value="9">Option 9</option>
        </optgroup>
        <optgroup label="Group B">
          <option value="10">Option 10</option>
          <option value="11">Option 11</option>
          <option value="12">Option 12</option>
          <option value="13">Option 13</option>
          <option value="14">Option 14</option>
          <option value="15">Option 15</option>
          <option value="16">Option 16</option>
          <option value="17">Option 17</option>
          <option value="18">Option 18</option>
          <option value="19">Option 19</option>
          <option value="20">Option 20</option>
          <option value="21">Option 21</option>
          <option value="22">Option 22</option>
          <option value="23">Option 23</option>
          <option value="24">Option 24</option>
          <option value="25">Option 25</option>
          <option value="26">Option 26</option>
          <option value="27">Option 27</option>
          <option value="28">Option 28</option>
        </optgroup>
      </select>
    </cbp-form-field>
  `;
};

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.args = {
};
*/



const PasswordTemplate = ({ label, description, fieldId, error, readonly, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper>
        <input 
          type="password" 
          name="hashedinput" 
          ${value ? `value="${value}"` : ''}  
          ${readonly ? `readonly` : ''} 
          ${disabled ? `disabled` : ''}
        />
      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const Password = PasswordTemplate.bind({});
Password.args = {
  value: '',
};
