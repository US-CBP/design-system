export default {
  title: 'Components/Flex',
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'select',
      options: ['flex', 'inline-flex'],
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse'],
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    alignItems: {
      control: 'select',
      options: ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    },
    alignContent: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'],
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    gap: {
      control: 'text',
    },
    breakpoint: {
      control: 'text',
    },
    content: {
      name: 'Content (slotted)',
      description: 'The flex children and their contents.',
      control: 'object',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    content: [
      {
        text: "Flex Item 1",
      },
      {
        text: "Flex Item 2",
      },
      {
        text: "Flex Item 3",
      },
      {
        text: "Flex Item 4",
      },
      {
        text: "Flex Item 5",
      },
    ],
  },
};

function createChildren(children) {
  const html = children.map(({ text}) => {
    return `<div>${text}</div>`
  })
  return html.join("")
};

const Template = ({ display, wrap, direction, alignItems, alignContent, justifyContent, gap, breakpoint, content, sx }) => {
  return ` 
        <cbp-flex
          ${display ? `display=${display}` : ''}
          ${wrap ? `wrap=${wrap}` : ''}
          ${direction ? `direction=${direction}` : ''}
          ${alignItems ? `align-items=${alignItems}` : ''}
          ${alignContent ? `align-content=${alignContent}` : ''}
          ${justifyContent ? `justify-content=${justifyContent}` : ''}
          ${gap ? `gap=${gap}` : ''}
          ${breakpoint ? `breakpoint=${breakpoint}` : ''}
          ${display ? `display=${display}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${createChildren(content)}
        </cbp-flex>
      `;
};

export const Flex = Template.bind({});
Flex.args = {}