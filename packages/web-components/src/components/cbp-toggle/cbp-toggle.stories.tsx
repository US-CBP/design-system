export default {
    title: 'Components/Toggle',
    //tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Sets the label for the toggle control',
            control:'text'
        },
        checked: {
            description: 'Sets the state of the toggle',
            control: 'boolean'
        },
        hideStatus: {
            description: 'Determines if the status text for the `on` and `off` is visible for the toggle control',
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
        disabled: {
            description: 'Sets the disable state for the toggle control',
            control: 'boolean'
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
            <cbp-checkbox 
                value="1"
            >
                <input
                    type="checkbox"
                    name="checkbox"
                    value="1"
                />
                Checkbox label
            </cbp-checkbox>
        </cbp-toggle>
    `;
};
  
export const Toggle = Template.bind({});
  
Toggle.args = {
    label: 'Toggle Label:',
    statusTexton: 'on',
    statusTextoff: 'off'
}

function generateToggles(items, labelWidth){
    const html = items.map(({label, hideStatus, statusTexton, statusTextoff, disabled, context, sx }) => {
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
            <cbp-checkbox 
                value="1"
            >
                <input
                    type="checkbox"
                    name="checkbox"
                    value="1"
                />
                Checkbox label
            </cbp-checkbox>
        </cbp-toggle>
        `;
    });
    return html.join('');
  }

const MultipleTemplate = ({ToggleItems, labelWidth}) => {
    return `
    <cbp-flex
        direction="column"
        gap="1rem"
        display="flex"
        class="hydrated"
    >
    ${generateToggles(ToggleItems, labelWidth)} 
    </cbp-flex>
    `;
}

export const MultipleToggle = MultipleTemplate.bind({});

MultipleToggle.args={
    ToggleItems: [
        {
            label: 'Toggle #1:',
            hideStatus: 'true',
            statusTexton: 'on',
            statusTextoff: 'off',
            disabled: false,
        },
        {
            label: 'Toggle #2:',
            hideStatus: 'true',
            statusTexton: 'on',
            statusTextoff: 'off',
            disabled: false,
        },
        {
            label: 'Toggle #3:',
            hideStatus: 'true',
            statusTexton: 'on',
            statusTextoff: 'off',
            disabled: false,
        },
        {
            label: 'Toggle #4:',
            hideStatus: 'true',
            statusTexton: 'on',
            statusTextoff: 'off',
            disabled: false,
        },
        {
            label: 'Toggle #5:',
            hideStatus: 'true',
            statusTexton: 'on',
            statusTextoff: 'off',
            disabled: false,
        },
    ],
    labelWidth: '10rem',
}