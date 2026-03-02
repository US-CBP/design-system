export default {
  title: 'Test/Form Field Groups',
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




const Prefix='[{"label":"Attorney","value":"Attorney"},{"label":"Coach","value":"Coach"},{"label":"Dr.","value":"Dr."},{"label":"Father","value":"Father"},{"label":"Governor","value":"Governor"},{"label":"Honorable","value":"Honorable"},{"label":"Officer","value":"Officer"},{"label":"Master","value":"Master"},{"label":"Miss","value":"Miss"},{"label":"Mr.","value":"Mr."},{"label":"Mrs","value":"Mrs."},{"label":"Ms.","value":"Ms"},{"label":"President","value":"President"},{"label":"Professor","value":"Professor"},{"label":"Reverend","value":"Reverend"}]';
const Suffix='[{"label":"I","value":"First"},{"label":"II","value":"Second"},{"label":"III","value":"Third"},{"label":"IV","value":"Fourth"},{"label":"IX","value":"Ninth"},{"label":"JR","value":"Junior"},{"label":"SR","value":"Senior"},{"label":"V","value":"Fifth"},{"label":"VI","value":"Sixth"},{"label":"VII","value":"Seventh"},{"label":"VIII","value":"Eighth"},{"label":"X","value":"Tenth"},{"label":"XI","value":"Eleventh"},{"label":"XII","value":"Twelfth"},{"label":"XIII","value":"Thirteenth"},{"label":"XIV","value":"Fourteenth"},{"label":"XV","value":"Fifteenth"},{"label":"XVI","value":"Sixteenth"},{"label":"XVII","value":"Seventeenth"}]';

// Combobox using Countries data as an asynchronous call: 
const FullNameTemplate = ({ label, description, fieldId, error, disabled, context, sx }) => {

  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >

      <cbp-flex 
        wrap="wrap"
        gap="var(--cbp-space-4x)"
        breakpoint="20rem"
      >

        <cbp-flex-item
          flex-basis="10rem"
          flex-shrink="0"
        >
          <cbp-form-field
            label="Prefix"
          >
            <cbp-dropdown name="prefix" items='${Prefix}'></cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item
          flex-basis="10rem"
          flex-grow="1"
        >
          <cbp-form-field
            label="First Name"
          >
            <input name="firstname" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-form-field
          label="M.I."
          sx='{"width":"5ch"}'
        >
          <input name="middleinitial" type="text" maxlength="1" />
        </cbp-form-field>

        <cbp-flex-item
          flex-basis="10rem"
          flex-grow="1"
        >
          <cbp-form-field
            label="Last Name"
          >
            <input name="lastname" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item
          flex-basis="10rem"
          flex-shrink="0"
        >
          <cbp-form-field
            label="Suffix"
          >
            <cbp-dropdown name="suffix" items='${Suffix}'></cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

      </cbp-flex>
    </cbp-form-field>
  `;
};

export const FullName = FullNameTemplate.bind({});
FullName.args = {
  label:"User's Full Name",
  description: "Required."
};
