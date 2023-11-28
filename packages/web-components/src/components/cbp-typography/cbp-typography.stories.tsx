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
    variant: {
      title: 'Variant',
      control: 'select',
      options: [
        'masthead-1',
        'masthead-2',
        'xxl',
        'xl',
        'l',
        'md',
        'sm',
        'xs',
        'text-body',
        'text-subhead'
      ]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },
  },
};

const Template = ({ sx, tag, variant }) => {
  return ` 
      <cbp-typography
        ${variant ? `variant=${variant}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${tag ? `<${tag}>` : ''}
          Hello World
        ${tag ? `</${tag}>` : ''}
      </cbp-typography>
    `
}

export const Typography = Template.bind({});

