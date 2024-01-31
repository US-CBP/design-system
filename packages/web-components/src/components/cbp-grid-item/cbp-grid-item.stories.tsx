export default {
  title: 'Components/Grid/Grid Item',
  //tags: ['autodocs'],
  argTypes: {
    gridColumnStart: {
      control: 'number',
    },
    gridColumnEnd: {
      control: 'number',
    },
    gridRowStart: {
      control: 'number',
    },
    gridRowEnd: {
      control: 'number',
    },
    alignSelf: {
      control: 'select',
      options: ['normal', 'stretch', 'center', 'start', 'end', 'self-start', 'self-end', 'baseline', 'first baseline', 'last baseline'],
    },
    justifySelf: {
      control: 'select',
      options: ['legacy', 'normal', 'stretch', 'center', 'safe center', 'unsafe center', 'start', 'end', 'self-start', 'self-end', 'left', 'right', 'baseline', 'first baseline', 'last baseline'],
    },
    gridArea: {
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
    content: "Controlled Grid Item"
  },
};


const Template = ({ gridColumnStart, gridColumnEnd, gridRowStart, gridRowEnd, alignSelf, justifySelf, gridArea, content, sx }) => {
  return ` 
    <cbp-grid
      grid-template-columns="repeat(5,1fr)"
      gap="1rem"
    >
      <cbp-grid-item
        ${gridColumnStart ? `grid-column-start=${gridColumnStart}` : ''}
        ${gridColumnEnd ? `grid-column-end=${gridColumnEnd}` : ''}
        ${gridRowStart ? `grid-row-start=${gridRowStart}` : ''}
        ${gridRowEnd ? `grid-row-end=${gridRowEnd}` : ''}
        ${alignSelf ? `align-self=${alignSelf}` : ''}
        ${justifySelf ? `justify-self=${justifySelf}` : ''}
        ${gridArea ? `grid-area=${gridArea}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${content}
      </cbp-grid-item>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
      <div>Grid Item 4</div>
      <div>Grid Item 5</div>
    </cbp-grid>
      `;
};

export const GridItem = Template.bind({});
GridItem.args = {}