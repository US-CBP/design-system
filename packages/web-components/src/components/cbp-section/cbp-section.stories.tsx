/* @jsx h */
//import { h } from '@stencil/core';

export default {
  title: 'Components/Section',
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: 'text (slotted)',
      description: 'Content slotted between the `cbp-section` tags may include markup and other components, although Storybook does not support this.',
      control: 'text',
    },
    tag: {
      description: 'Specifies the child tag rendered by the component.',
      control: 'select',
      options: ['div', 'section', 'none'],
    },
    accessibilityText: {
      description:
        'Accessibility text is applied as an `aria-label` and provides semantic meaning to a `section` tags, turning it into a landmark tag.',
      type: 'string',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    text: 'Section content here.',
  },
};


const Template = ({ text, tag, accessibilityText, sx }) => {
  return ` 
      <cbp-section
        ${tag !== 'none' ? `tag=${tag}` : ''}
        ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text}
      </cbp-section>
    `;
};

/*
const Template = ({ text }, props) => {
  return h(
    <cbp-section {...props}>
      ${text}
    </cbp-section>
  )
};
*/

export const Section = Template.bind({});
