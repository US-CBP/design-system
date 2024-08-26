export default {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  argTypes: {
    uid: {
      description: 'A unique `id` applied to the dialog and referenced by the control.',
      control: 'text',
    },
    open: {
      description: 'Specifies whether the drawer is open or closed.',
      control: 'boolean',
    },
    title: {
      name: 'Title (slotted)',
      description: 'Set the title in the banner area of the card',
      control: 'text',
    },
    content: {
      name: 'Body Text (slotted)',
      description: 'Set the body text of the card',
      control: 'text',
    },
    accessibilityText: {
      description: 'Accessibility text is required to label the dialog and is applied as an `aria-label`.',
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['default', 'danger'],
    },
    actionsLayout: {
      name: 'Actions Layout',
      description: 'Choose actions layout of the dialog component',
      control: 'radio',
      options: ['single', 'double', 'triple'],
    },
    actionsConfig: {
      name: 'Dialog Actions',
      description: 'Configure card button labels and colors. Available button colors: `primary`, `secondary`, `tertiary` and `danger`',
      control: 'object',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};


const renderActions = (layout, { btn1, btn2, btn3 }) => {
  if (layout === 'double') {
    return `
      <div slot="cbp-dialog-actions">
        <cbp-button tag="${btn2.tag}" ${btn2.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn2.color}" aria-describedby="card-heading-1">${btn2.label}</cbp-button>
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn1.color}" aria-describedby="card-heading-1">${btn1.label}</cbp-button>
      </div>
    `;
  } else if (layout === 'triple') {
    return `
      <div slot="cbp-dialog-actions">
        <cbp-button tag="${btn3.tag}" ${btn3.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn3.color}" aria-describedby="card-heading-1">${btn3.label}</cbp-button>
        <cbp-button tag="${btn2.tag}" ${btn2.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn2.color}" aria-describedby="card-heading-1">${btn2.label}</cbp-button>
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn1.color}" aria-describedby="card-heading-1">${btn1.label}</cbp-button>
      </div>
    `;
  } else {
    return `
      <div slot="cbp-dialog-actions">
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn1.color}" aria-describedby="card-heading-1">${btn1.label}</cbp-button>
      </div>
    `;
  }
};

const Template = ({ title, content, color, open, uid, accessibilityText, actionsLayout, actionsConfig, sx }) => {
  return `
    <cbp-button
      type="button"
      color="secondary"
      accessibility-text="Open Drawer"
      target-prop="open"
      controls=${uid}
    >
      <cbp-icon name="bars"></cbp-icon>
    </cbp-button>

    <cbp-dialog
      ${open ? `open=${open}` : ''}
      ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
      ${color && color != 'default' ? `color=${color}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      ${uid ? `uid=${uid}` : ''}
    >
      <cbp-typography
        slot="cbp-dialog-header"
        tag="h2"
        variant="heading-dialog"
        divider="underline"
      >
        ${title}
      </cbp-typography>

      <cbp-typography
        slot="cbp-dialog-body"
        tag="div"
        variant="heading-xs"
      >
        ${content}
      </cbp-typography>

      ${renderActions(actionsLayout, actionsConfig)}
    </cbp-dialog>
  `;
};

export const Dialog = Template.bind({});
Dialog.args = {
  title: 'Dialog Title',
  content: 'Here is an example of some body text for this dialog.',
  uid: 'dialog',
  actionsLayout: 'single',
  actionsConfig: {
    btn1: {
      label: 'Action 1',
      tag: 'button',
      color: 'primary',
    },
    btn2: {
      label: 'Action 2',
      tag: 'button',
      color: 'secondary',
    },
    btn3: {
      label: 'Action 3',
      tag: 'button',
      color: 'tertiary',
    },
  },
};
