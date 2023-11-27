export default {
  title: 'Components/Typography',
  tags: ['autodocs'],
  argTypes: {
    tag: {
      title: 'Tag',
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
      ]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },
  },
  args: {
    tag: 'h1'
  }
};

const Template = ({ sx, tag }) => { 
  return ` 
      <cbp-typography ${sx ? `sx=${JSON.stringify(sx)}` : ''}>
        <${tag}>Hello World</${tag}>
      </cbp-typography>
    `
}

export const Typography = Template.bind({});

