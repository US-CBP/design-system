export default {
    title: 'Components/Container',
    tags: ['autodocs'],
    argTypes: {
    content: {
        name: 'Content (slotted)',
        description: 'Content within the container may contain any markup, but Storybook does not allow adding HTML via this control.',
        control: 'text'
        },
      background: {
        description: 'The `background` CSS shorthand property, which can contain only a background-color (in any acceptable CSS value format) or any of the acceptable shorthand properties. Defaults to transparent.',
        control: 'text',
      },
      textColor: {
        description: 'The color (in any acceptable CSS value format) of the text when placed within the inner container, if placed on a colored background. Defaults to the color of the `body` text.',
        control: 'text',
      },
      width: {
        description: 'The width (in CSS units) of the inner container. Defaults to `auto` as a block-level element (takes up 100% of the space, including margins)',
        control: 'text',
      },
      margins: {
        description: 'The horizontal margins of the inner container. Acceptable values include `responsive`, `auto`, or a string in CSS units or CSS variable referencing a design token. Defaults to `auto`',
        control: 'text',
      },
      sx: {
        description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
        control: 'object'
      },
    },
    args: {
        content: 'Plain text content slotted inside of the `cbp-container` tags.',
    }
  };
  
  const Template = ({ content, background, textColor, width, margins, sx }) => { 
    return ` 
      <cbp-container
        ${background ? `background=${background}` : ''}
        ${textColor ? `text-color=${textColor}` : ''}
        ${width ? `width=${width}` : ''}
        ${margins ? `margins=${margins}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${content}
      </cbp-container>
      `
  }
  
  export const Container = Template.bind({});
  
