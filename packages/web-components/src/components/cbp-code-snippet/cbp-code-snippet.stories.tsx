export default {
  title: 'Components/Code Snippet',
  tags: ['new'],
  argTypes: {
    codeSnippet: {
      description: 'Code to slot into code snippet',
      control: 'text',
      name: 'Code (slotted)'
    },
    variant: {
      description: 'Determines the display type of the code snippet (component default is "inline")',
      control: 'select',
      options: ['inline', 'block'],
    },
    height: {
      description: 'Sets the height of the block variant (not expanded)',
      control: 'text',
      if: { arg: 'variant', eq: 'block' },
    },
    context: {
      control: 'select',
      options: ['light-inverts', 'light-always', 'dark-inverts', 'dark-always'],
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    codeSnippet: `<a href='#'>test code snippet</a>`,
  },
};

const Template = ({ codeSnippet, variant, height, context, sx }) => {
  return ` 
      <cbp-code-snippet
        ${variant ? `variant= ${variant}` : ''}
        ${height ? `height= ${height}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${codeSnippet}
      </cbp-code-snippet>
    `;
};
export const CodeSnippet = Template.bind({});

const BlockTemplate = ({ codeSnippet, height, context, sx }) => {
  return ` 
      <cbp-code-snippet
        variant= block
        ${height ? `height= ${height}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${codeSnippet}
      </cbp-code-snippet>
    `;
};

export const CodeSnippetBlock = BlockTemplate.bind({});
CodeSnippetBlock.args ={
  variant: "block",
  codeSnippet: "<a href='#'>test code snippet</a> <br /> <a href='#'>test code snippet</a> <br /><a href='#'>test code snippet</a> <br /><a href='#'>test code snippet</a> <br /><a href='#'>test code snippet</a> <br /><a href='#'>test code snippet</a> <br /><a href='#'>test code snippet</a> <br />",
  height: "50px"
}
