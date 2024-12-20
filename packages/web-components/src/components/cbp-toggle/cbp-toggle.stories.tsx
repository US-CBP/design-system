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
    statusTexton: {
        description: 'Sets the label for the `on` state of the toggle control',
        control: 'text'
    },
    statusTextoff: {
        description: 'Sets the label for the `off` state of the toggle control',
        control: 'text'
    },
}

function generateToggles(items, labelWidth, hideStatus, disabled, context, sx){
    const html = items.map(({label, statusTexton, statusTextoff}) => {
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

const MultipleTemplate = ({ToggleItems, labelWidth, hideStatus, disabled, context, sx }) => {
    return `
    <div>
        ${generateToggles(ToggleItems, labelWidth, hideStatus, disabled, context, sx )} 
    </div>
    `;
}

export const MultipleToggle = MultipleTemplate.bind({});

MultipleToggle.args={
    ToggleItems: [
        {
            label: 'Toggle #1:',
            statusTexton: '#1 On',
            statusTextoff: '#1 Off',
            disabled: false,
        },
        {
            label: 'Toggle #2:',
            statusTexton: '#2 On',
            statusTextoff: '#2 Off',
            disabled: false,
        },
        {
            label: 'Toggle #3:',
            statusTexton: '#3 On',
            statusTextoff: '#3 Off',
            disabled: false,
        },
        {
            label: 'Toggle #4:',
            statusTexton: '#4 On',
            statusTextoff: '#4 Off',
            disabled: false,
        },
        {
            label: 'Toggle #5:',
            statusTexton: '#5 On',
            statusTextoff: '#5 Off',
            disabled: false,
        },
    ],
    labelWidth: '10rem',
}