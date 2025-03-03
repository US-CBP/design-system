export default {
    title: 'Components/Code Snippet',
    //tags: ['autodocs'],
    argTypes: {
      codeSnippet: {
        description: 'Code to slot into code snippet',
        control: 'text',
      },
      variant: {
        description: 'determines the display type of the code snippet',
        control: 'select',
        options: [ "inline", "block"]
      },
      maxheight: {
        description: 'sets the max-height on the block variant control',
        control: 'text',
        if: { arg: 'variant', eq: 'block' },
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
      /** code snippet passed to the <code> block so any indent/spacing will be in final render*/
      codeSnippet: `<a href='#'> test code snippet </a>`,
    },
  };
  
  const Template = ({codeSnippet, variant, maxheight, context, sx}) => {
    return ` 
    <cbp-code-snippet
      ${variant ? `variant= ${variant}` : ``}
      ${maxheight ? `maxheight= ${maxheight}` : ``}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >${codeSnippet}</cbp-code-snippet>
      `;
      /** NOTE: No space between slot & tags here or it will display in the render */
  };
  export const CodeSnippet = Template.bind({});
  