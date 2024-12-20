export default {
    title: 'Components/Toggle',
    //tags: ['autodocs'],
    argTypes: {
        hideStatus: {
            description: 'Determines if the status text for the `on` and `off` is visible for the toggle control',
            control: 'boolean'
        },
        disabled: {
            description: 'Sets the disable state for the toggle control',
            control: 'boolean'
        },    
        statusTexton: {
            description: 'Sets the label for the `on` state of the toggle control',
            control: 'text'
        },
        statusTextoff: {
            description: 'Sets the label for the `off` state of the toggle control',
            control: 'text'
        },
        context : {
            control: 'select',
            options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
        },
        sx: {
            description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
            control: 'object',
        },
    }
  };

const Template = ({label, checked, hideStatus, statusTexton, statusTextoff, disabled, context, sx }) => {
    return ` 
        <cbp-toggle
            ${checked ? 'checked' : ''}
            ${hideStatus ? `hide-status` : ''}
            ${statusTexton ? `status-text-on="${statusTexton}"` : ''} 
            ${statusTextoff ? `status-text-off="${statusTextoff}"` : ''}
            ${disabled ? 'disabled' : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ``}
            >
            <label
                slot='toggleLabel'
            >
                ${label}
            </label>
            <input
                type="checkbox"
                name="checkbox"
                value="1"
            />
        </cbp-toggle>
    `;
};
  
export const Toggle = Template.bind({});
  
Toggle.args = {
    label: 'Toggle Label:'
}
Toggle.argTypes = {
    label: {
        description: 'Sets the label for the toggle control',
        control:'text'
    },
    checked: {
        description: 'Sets the state of the toggle',
        control: 'boolean'
    },

}

function generateToggles(items, labelWidth, hideStatus, statusTexton, statusTextoff, disabled, context, sx){
    const html = items.map(({label}) => {
    return `<cbp-toggle
        ${hideStatus ? `hide-status` : ''}
        ${statusTexton ? `status-text-on="${statusTexton}"` : ''} 
        ${statusTextoff ? `status-text-off="${statusTextoff}"` : ''}
        ${disabled ? 'disabled' : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ``}
        >
            <label
                slot='toggleLabel'
                style='width: ${labelWidth}'
            >
                ${label} 
            </label>
            <input
                type="checkbox"
                name="checkbox"
                value="1"
            />
        </cbp-toggle>
        `;
    });
    return html.join('');
  }

const MultipleTemplate = ({ToggleItems, labelWidth, hideStatus, statusTexton, statusTextoff,  disabled, context, sx }) => {
    //TODO: wrap in a form control w/ a label of Settings. use form fields as an example
    return `
    <cbp-form-field
        label="Settings"
        description="An example of multiple toggles in a form field"
        group=""
        >
        ${generateToggles(ToggleItems, labelWidth, hideStatus, statusTexton, statusTextoff, disabled, context, sx )} 
    </cbp-form-field>
    `;
}

export const MultipleToggle = MultipleTemplate.bind({});

MultipleToggle.args={
    ToggleItems: [
        {
            label: 'Toggle #1:',
            disabled: false,
        },
        {
            label: 'Toggle #2:',
            disabled: false,
        },
        {
            label: 'Toggle #3:',
            disabled: false,
        },
        {
            label: 'Toggle #4:',
            disabled: false,
        },
        {
            label: 'Toggle #5:',
            disabled: false,
        },
    ],
    labelWidth: '10rem',
}