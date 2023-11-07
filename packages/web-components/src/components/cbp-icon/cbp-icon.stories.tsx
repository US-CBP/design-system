export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  argTypes: {
    use: {
      description: 'Specify the `id` if the built-in icon to use from the embedded sprite-sheet.',
      control: 'text'
    },
    color: {
      description: 'The color of the icon. Defaults to `currentColor`, which represents the inherited font color of the icon\'s parent element.',
      type: 'string'
    },
    size: {
      description: 'The size of the icon, including CSS units. Defaults to `1em`, which matches the size of the text in the icon\'s parent element.',
      type: 'string'
    },
    accessibilityText: {
      description: 'Accessibility text is applied as an `aria-label` and should be supplied when the button does not contain text or it is not sufficiently and uniquely descriptive.',
      type: 'string'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },    
  },
};

const Template = ({ use, color, size, accessibilityText, sx }) => {
  return ` 
    <cbp-app>
      <cbp-icon
        ${use ? 'use="'+use+'"' : ''}
        ${color ? 'color="'+color+'"' : ''}
        ${size ? 'size="'+size+'"' : ''}
        ${accessibilityText ? 'accessibility-text="'+accessibilityText+'"' : ''}
        ${sx ? 'sx='+JSON.stringify(sx) : ''}
        ></cbp-icon>
    </cbp-app>
  `
}
export const Icon = Template.bind({});