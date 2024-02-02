export default {
  title: 'Components/Flex/Flex Item',
  //tags: ['autodocs'],
  argTypes: {
    order: {
      control: 'number',
    },
    alignSelf: {
      control: 'select',
      options: ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    },
    flexGrow: {
      control: 'number',
    },
    flexShrink: {
      control: 'number',
    },
    flexBasis: {
      control: 'text',
    },
    content: {
      name: 'Content (slotted)',
      description: 'The contents of the specific flex item being controlled in this story.',
      control: 'text',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    content: 'Controlled Flex Item'
  },
};

const Template = ({ order, alignSelf, flexGrow, flexShrink, flexBasis, content, sx }) => {
  return ` 
    <cbp-flex
      wrap="wrap"
      gap="1rem" 
      sx='{"min-height":"200px"}'
    >
      <cbp-flex-item
        ${order ? `order=${order}` : ''}
        ${alignSelf ? `align-self=${alignSelf}` : ''}
        ${flexGrow ? `flex-grow=${flexGrow}` : ''}
        ${flexShrink ? `flex-shrink=${flexShrink}` : ''}
        ${flexBasis ? `flex-basis=${flexBasis}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${content}
      </cbp-flex-item>
      <div>Flex Item 2</div>
      <div>Flex Item 3</div>
      <div>Flex Item 4</div>
      <div>Flex Item 5</div>
    </cbp-flex>      
  `;
};

export const FlexItem = Template.bind({});
FlexItem.args = {}