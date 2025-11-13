export default {
  title: 'Components/Dot Indicator',
  tags: ['new'],
  argTypes: {
    current: {
      description: 'Sets the Current item of the dot indicator',
      control: 'number'
    },
    items: {
      description: 'Sets the number of Items in the dot-indicator',
      control: 'number'
    },
    itemName: {
      description: 'Sets the Unit of measure for the dot-indicator, this is used for Accessibility text',
      control: 'text'
    },
  },
};


const Template = ({ current, items, itemName }) => {
  return `
    <cbp-dot-indicator
      ${current ? `current=${current}` : ""}
      items=${items}
      item-name=${itemName}
    ></cbp-dot-indicator>
`;
};

export const dotIndicator = Template.bind({});
dotIndicator.args = {
  items: 9,
  itemName: 'Slide'
}