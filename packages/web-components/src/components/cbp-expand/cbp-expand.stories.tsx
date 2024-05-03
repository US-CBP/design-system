export default {
  title: 'Components/Expand',
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text making up the heading control for the Expand component.',
      control: 'text',
    },
    content: {
      name: 'content (slotted)',
      description: 'Content to be hidden/revealed. May include markup, but not supported by Storybook.',
      control: 'text',
    },
    headingLevel: {
      description: 'Specifies the heading level for the component heading, which acts as the expand control. Defaults to "h4".',
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
    open: {
      description: 'Indicates whether the component is in an "open" or "closed" state affecting content visibility.',
      control: 'boolean',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    label: 'This is the Expand label.',
    content: 'This is the hidden/revealed content.',
  },
};

const Template = ({ label, content, open, headingLevel, sx }) => {
  return ` 
        <cbp-expand
          ${label ? `label="${label}"` : ''}
          ${headingLevel ? `heading-level="${headingLevel}"` : ''}
          ${open ? `open` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
            ${content}
        </cbp-expand>
      `;
};
export const Expand = Template.bind({});

/*
  const StackedTemplate = ({ label, content, open, headingLevel, sx }) => {
    return ` 
        <cbp-expand
          ${label ? `label="${label}"` : ''}
          ${headingLevel ? `heading-level="${headingLevel}"` : ''}
          ${open ? `open` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
            ${content}
        </cbp-expand>

        <cbp-expand
        ${label ? `label="${label}"` : ''}
        ${headingLevel ? `heading-level="${headingLevel}"` : ''}
        ${open ? `open` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
          ${content}
      </cbp-expand>
      `;
  };
  export const Stacked = StackedTemplate.bind({});
  */
