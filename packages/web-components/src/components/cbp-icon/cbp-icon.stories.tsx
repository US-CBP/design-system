export default {
  title: 'Components/Icon',
  // TechDebt: autodocs not working here for some reason - throwing Vite error
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: 'Named icons that are built-in to the component.',
      control: 'select',
      options: [
        'angle-down',
        'arrow-right',
        'bars',
        'book',
        'check',
        'chevron-right',
        'circle',
        'circle-info',
        'circle-xmark',
        'ellipsis-vertical',
        'envelope',
        'external-link-alt',
        'eye',
        'eye-slash',
        'filter',
        'magnifying-glass',
        'minus',
        'plus',
        'right-to-bracket',
        'right-from-bracket',
        'sort-asc',
        'sort-desc',
        'square',
        'star',
        'star-solid',
        'times',
        'triangle-exclamation',
        'up-right-from-square',
        'user',
      ],
    },
    color: {
      description: "The color of the icon. Defaults to `currentColor`, which represents the inherited font color of the icon's parent element.",
      type: 'string',
    },
    size: {
      description: "The size of the icon, including CSS units. Defaults to `1em`, which matches the size of the text in the icon's parent element.",
      type: 'string',
    },
    rotate: {
      description: 'You can reuse many icons by rotating one instance to other orientations. Specified as a number representing degrees.',
      type: 'number',
    },

    accessibilityText: {
      description:
        'Accessibility text is applied as an `aria-label` and should be supplied when the button does not contain text or it is not sufficiently and uniquely descriptive.',
      type: 'string',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    name: 'user',
  },
};

const Template = ({ name, color, size, rotate, accessibilityText, sx }) => {
  return ` 
    <cbp-icon
      ${name ? `name=${name}` : ''}
      ${color ? `color=${color}` : ''}
      ${size ? `size=${size}` : ''}
      ${rotate ? `rotate=${rotate}` : ''}
      ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    ></cbp-icon>
  `;
};
export const Icon = Template.bind({});
