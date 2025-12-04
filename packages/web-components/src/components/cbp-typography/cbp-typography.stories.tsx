export default {
  title: 'Components/Typography',
  tags: ['beta'],
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
    tag: 'div',
    divider: 'none',
  },
};

const Template = ({ text, tag, variant, divider, context, sx }) => {
  return ` 
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        ${variant != undefined ? `variant=${variant}` : ''}
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text}
      </cbp-typography>
    `;
};
export const Typography = Template.bind({});

Typography.argTypes = {
  variant: {
      control: 'select',
      description: 'An optional variant used for styling the semantic element and its contents.',
      options: ['masthead-1', 'masthead-2', 'heading-xxl', 'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs', 'body-text', 'subhead'],
    },
}
const AllStyles = ({ text, tag, divider, context, sx }) => {
return ` 
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "masthead-1"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (masthead-1)
      </cbp-typography>

      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "masthead-2"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (masthead-2)
      </cbp-typography>

      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "heading-xxl"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (heading-xxl)
      </cbp-typography>
      
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "heading-xl"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (heading-xl)
      </cbp-typography>
      
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "heading-lg"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (heading-lg)
      </cbp-typography>
      
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "heading-md"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (heading-md)
      </cbp-typography>
      
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "heading-sm"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (heading-sm)
      </cbp-typography>
      
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "heading-xs"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (heading-xs)
      </cbp-typography>
      
      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "body-text"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (body-text)
      </cbp-typography>

      <cbp-typography
        ${tag ? `tag=${tag}` : ''}
        variant = "subhead"
        ${divider != 'none' ? `divider=${divider}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text} (subhead)
      </cbp-typography>
    `;
}

export const TypographyAllStyles = AllStyles.bind({});