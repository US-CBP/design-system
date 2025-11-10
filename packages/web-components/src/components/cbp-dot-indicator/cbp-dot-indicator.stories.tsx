export default {
  title: 'Components/Dot Indicator',
  tags: ['new'],
  argTypes: {
  },
};


const Template = ({slides}) => {
  return `
    <cbp-dot-indicator 
        current=0
        items=${slides.length}
    ></cbp-dot-indicator>
`;
};

export const dotIndicator = Template.bind({});

dotIndicator.args ={
    slides: [1, 2, 3, 4, 5, 6, 7, 8, 9],
}