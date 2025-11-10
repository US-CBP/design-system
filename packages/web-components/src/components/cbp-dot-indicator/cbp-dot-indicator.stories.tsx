export default {
  title: 'Components/Dot Indicator',
  tags: ['new'],
  argTypes: {
  },
};


const Template = () => {
  return `
    <cbp-dot-indicator
        items=9
    ></cbp-dot-indicator>
`;
};

export const dotIndicator = Template.bind({});
