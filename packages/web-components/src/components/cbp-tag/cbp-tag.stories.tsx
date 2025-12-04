export default {
  title: 'Components/Tag',
  tags: ['beta'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'The visible text within the tag. HTML markup may be slotted here as well, but is not supported by Storybook.',
      control: 'text',
    },
    color: {
      description: 'The color of the tag, from a predefined list of design tokens.',
      control: 'select',
      options: ['default', 'danger', 'success', 'warning'],
    },
    withIcon: {
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
    label: 'Tag',
  },
};

const Template = ({ label, color, withIcon, context, sx }) => {
  const Icons = {
    default: 'circle-info',
    danger: 'circle-xmark',
    success: 'check',
    warning: 'triangle-exclamation',
  };
  const Icon = withIcon ? Icons[color] || 'circle-info' : null;

  return ` 
    <cbp-tag
      ${color && color != 'default' ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${Icon ? `<cbp-icon name="${Icon}"></cbp-icon>` : ''}
      ${label}
    </cbp-tag>
  `;
};

export const Tag = Template.bind({});
/*
  Attempt at CSF3:
    * Has issues with the decorator wrapping the story in `cbp-app` tags.
      * Using the newer documented method doesn't wrap the story in `cbp-app`.
      * Using the old (current) method renders the story contents as "[object] [Object]".
    * Autopopulates many component props in the control panel automatically, but shows them as "object" - need to define them as argTypes to work properly anyway.  
    * Displays additional unwanted properties in the controls panel.
*/

/*
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
const meta: Meta = {
  title: 'Components/Tag',
  tags: ['beta'],
  component: 'cbp-tag',
  argTypes: {
    label: {
      name: 'label (slotted)',
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['default', 'danger', 'success', 'warning'],
    },
    withIcon: {
      control: 'boolean',
    },
    context : {
      control: 'select',
      options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      control: 'object',
    },
  },
};
export default meta;
type Story = StoryObj;
//  By default, stories will render the component defined in the meta (default export), with the args passed to it. 
//  If you need to render something else, you can provide a function to the render property that returns the desired output.
export const Basic: Story = {};
 
export const WithProp: Story = {
  render: () => html`
    <div>
      Test
    </div>
  `,
};
export const Tag: Story = {
  args: {
    label: 'Tag',
    color: undefined,
    context: undefined,
    sx: undefined
  },
  render: (args) => html`
    <cbp-tag
      ${args.color ? `color="${args.color}"` : ''}
      ${args.context ? `context="${args.context}"` : ''}
      ${args.sx ? `sx='${args.sx}'` : ''}
    >
      ${args.label}
    </cbp-tag>
  `,
};
*/
Tag.args = {};