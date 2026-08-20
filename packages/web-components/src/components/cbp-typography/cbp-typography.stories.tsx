export default {
  title: 'Content/Typography',
  tags: ['beta'],
  argTypes: {
    text: {
      name: 'text (slotted)',
      description: 'The text content wrapped by the specified semantic tag and styles.',
      control: 'text',
    },
    withIcon: {
      control: 'boolean',
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

function generateIcon(variant){
  switch (variant){
    case 'heading-xxl':
      return `<cbp-icon size='1.75rem' name="landmark" sx='{"margin-inline-end":"0.5rem"}'></cbp-icon>`
    case 'heading-xl':
      return `<cbp-icon size='1.5rem' name="landmark" sx='{"margin-inline-end":"0.5rem"}'></cbp-icon>`
    case 'heading-lg':
      return `<cbp-icon size='1.25rem' name="landmark" sx='{"margin-inline-end":"0.5rem"}'></cbp-icon>`
    case 'heading-md':
    case 'heading-sm':
      return `<cbp-icon size='1rem' name="landmark" sx='{"margin-inline-end":"0.5rem"}'></cbp-icon>`
    case 'heading-xs':
      return `<cbp-icon size='0.75rem' name="landmark" sx='{"margin-inline-end":"0.25rem"}'></cbp-icon>`
    default:
      return `<cbp-icon size='0.875rem' name="landmark" sx='{"margin-inline-end":"0.25rem"}'></cbp-icon>`
  }
}

const Template = ({ text, withIcon, tag, variant, size, lineheight, fontweight, divider, context, sx }) => {
  return ` 
    <cbp-typography
      ${tag ? `tag="${tag}"` : ''}
      ${variant != undefined ? `variant="${variant}"` : ''}
      ${size != undefined ? `size="${size}"` : ''}
      ${lineheight != undefined ? `line-height="${lineheight}"` : ''}
      ${fontweight != undefined ? `font-weight="${fontweight}"` : ''}
      ${divider != 'none' ? `divider="${divider}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${withIcon ? generateIcon(variant) : ''}
      ${text}
    </cbp-typography>
  `;
};
export const Typography = Template.bind({});
Typography.argTypes = {
  variant: {
      control: 'select',
      description: 'An optional variant used for styling the semantic element and its contents.',
      options: [ 'heading-xxl', 'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs', 'body-text', 'subhead'],
    },
  size: {
    control: 'select',
    description: 'An optional size control used for setting the font-size of element',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  },
  lineheight:{
      control: 'select',
      description: 'An optional control used for setting the line-height of element',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  },
  fontweight:{
    control: 'select',
    description: 'an optional control used to set the font weight of the element',
    options: ['thin', 'light', 'regular', 'medium', 'bold', 'black' ]
  }
}




// TechDebt: This can be more efficiently achieved by looping over an array of all variants; refactor when we add the additional variants/tokens.
const AllStyles = ({ text, withIcon, tag, divider,  context, sx }) => {
  
  var variants = [ 'heading-xxl', 'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs', 'body-text', 'subhead'];;
  var htmlVariant = ``;
  var htmlSize = ``;

  for(var y=0; y < variants.length; y++){
    htmlVariant += `
      <cbp-typography
        variant=${variants[y]}
        ${tag ? `tag="${tag}"` : ''}
        ${divider != 'none' ? `divider="${divider}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >      
        ${withIcon ? generateIcon(variants[y]) : ''}
        ${text} (variant=${variants[y]})
      </cbp-typography>
    `
  }

  for(var x=1; x < 20; x++){
  htmlSize +=`
      <cbp-typography
        size=${x}
        ${tag ? `tag="${tag}"` : ''}
        ${divider != 'none' ? `divider="${divider}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${text} (size=${x})
      </cbp-typography>
    `;
  };

  var html = htmlVariant + `<hr />` + htmlSize;
  return html;
}

export const TypographyAllStyles = AllStyles.bind({});