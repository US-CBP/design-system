export default {
    title: 'Components/Toggle',
    tags: ['new'],
    argTypes: {
        hideStatus: {
            description: 'Determines if the status text for the `on` and `off` is visible for the toggle control',
            control: 'boolean'
        },
        disabled: {
            description: 'Sets the disable state for the toggle control',
            control: 'boolean'
        },    
        statusTextOn: {
            description: 'Sets the label for the `on` state of the toggle control',
            control: 'text'
        },
        statusTextOff: {
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

const Template = ({label, checked, name, value, hideStatus, statusTextOn, statusTextOff, disabled, context, sx }) => {
    return ` 
        <cbp-toggle
            ${checked ? 'checked' : ''}
            ${hideStatus ? `hide-status` : ''}
            ${statusTextOn ? `status-text-on="${statusTextOn}"` : ''} 
            ${statusTextOff ? `status-text-off="${statusTextOff}"` : ''}
            ${disabled ? 'disabled' : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
            >
                ${label}
                <input
                    type="checkbox"
                    name="${name}"
                    value="${value}"
                />
            
        </cbp-toggle>
    `;
};
  
export const Toggle = Template.bind({});
  
Toggle.args = {
    label: 'Toggle Label',
    checked: false
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
    name: {
        description: 'Specifies the `name` attribute of the slotted checkbox.',
        control: 'text',
    },
    value: {
        description: 'Specifies the `value` attribute of the slotted checkbox.',
        control: 'text',
    },
}


function generateToggles(items, labelWidth, hideStatus, statusTextOn, statusTextOff, disabled, context, sx){
    const html = items.map(({label}, i) => {
    return `<cbp-toggle
        ${hideStatus ? `hide-status` : ''}
        ${statusTextOn ? `status-text-on="${statusTextOn}"` : ''} 
        ${statusTextOff ? `status-text-off="${statusTextOff}"` : ''}
        ${disabled ? 'disabled' : ''}
        ${labelWidth ? `width="${labelWidth}"` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
        >
            ${label} 
            <input
                type="checkbox"
                name="toggle${i}"
                value=${i}
            />
        </cbp-toggle>
        `;
    });
    return html.join('');
  }

const MultipleTemplate = ({ToggleItems, labelWidth, hideStatus, statusTextOn, statusTextOff,  disabled, context, sx }) => {
    return `
    <cbp-form-field
        label="Settings"
        description="An example of multiple toggles in a form field"
        group
        >
        ${generateToggles(ToggleItems, labelWidth, hideStatus, statusTextOn, statusTextOff, disabled, context, sx )} 
    </cbp-form-field>
    `;
}

export const MultipleToggle = MultipleTemplate.bind({});

MultipleToggle.args={
    ToggleItems: [
        {
            label: 'Toggle #1',
            disabled: false,
        },
        {
            label: 'Toggle #2',
            disabled: false,
        },
        {
            label: 'Toggle #3',
            disabled: false,
        },
        {
            label: 'Toggle #4',
            disabled: false,
        },
        {
            label: 'Toggle #5',
            disabled: false,
        },
    ],
    labelWidth: '10rem',
}