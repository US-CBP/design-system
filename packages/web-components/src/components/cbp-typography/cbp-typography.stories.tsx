export default {
  title: 'Content/Typography',
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

const Template = ({ text, tag, variant, size, divider, context, sx }) => {
  console.log('size: ', size)
  return ` 
    <cbp-typography
      ${tag ? `tag="${tag}"` : ''}
      ${variant != undefined ? `variant="${variant}"` : ''}
      ${size != undefined ? `size="${size}"` : ''}
      ${divider != 'none' ? `divider="${divider}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
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
  size: {
    control: 'select',
    description: 'An optional size control used for setting the font-size and line-height of element',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  }
}




// TechDebt: This can be more efficiently achieved by looping over an array of all variants; refactor when we add the additional variants/tokens.
const AllStyles = ({ text, tag, divider, context, sx }) => {
  
  var html = '';
  for(var x=20; x > 0; x--){
  html +=`
      <cbp-typography
        size=${x}
        ${tag ? `tag="${tag}"` : ''}
        ${divider != 'none' ? `divider="${divider}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${text} --> size=${x}
      </cbp-typography>
    `;
  };
  return html;

  // return ` 
  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "masthead-1"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (masthead-1)
  //   </cbp-typography>

  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "masthead-2"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (masthead-2)
  //   </cbp-typography>

  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "heading-xxl"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (heading-xxl)
  //   </cbp-typography>
    
  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "heading-xl"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (heading-xl)
  //   </cbp-typography>
    
  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "heading-lg"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (heading-lg)
  //   </cbp-typography>
    
  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "heading-md"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (heading-md)
  //   </cbp-typography>
    
  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "heading-sm"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (heading-sm)
  //   </cbp-typography>
    
  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "heading-xs"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (heading-xs)
  //   </cbp-typography>
    
  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "body-text"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (body-text)
  //   </cbp-typography>

  //   <cbp-typography
  //     ${tag ? `tag="${tag}"` : ''}
  //     variant = "subhead"
  //     ${divider != 'none' ? `divider="${divider}"` : ''}
  //     ${context && context != 'light-inverts' ? `context="${context}"` : ''}
  //     ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
  //   >
  //     ${text} (subhead)
  //   </cbp-typography>
  // `;
}

export const TypographyAllStyles = AllStyles.bind({});