export default {
  title: 'Components/Typography',
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: 'text (slotted)',
      description: 'The text content wrapped by the specified semantic tag and styles.',
      control: 'text',
    },
    tag: {
      control: 'select',
      description: 'The semantic element wrapping the content.',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span'],
    },
    variant: {
      control: 'select',
      description: 'An optional variant used for styling the semantic element and its contents.',
      options: ['none', 'masthead-1', 'masthead-2', 'heading-xxl', 'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs', 'body-text', 'subhead'],
    },
    divider: {
      control: 'select',
      description: 'An optional styling of the content to provide a visual divider.',
      options: ['none', 'underline', 'fill'],
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
    text: 'Hello World',
    tag: 'span',
    variant: 'none',
    divider: 'none',
  },
};

const Template = ({ text, tag, variant, divider, context, sx }) => {
  return ` 
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        ${variant != 'none' ? `variant=${variant}` : ''}
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text}
      </cbp-typography>
    `;
};

export const Typography = Template.bind({});
