export default {
  title: 'Components/Grid',
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'select',
      options: ['grid', 'inline-grid'],
    },
    gridTemplateAreas: {
      control: 'text',
    },
    gridTemplateColumns: {
      control: 'text',
    },
    gridTemplateRows: {
      control: 'text',
    },
    gridAutoFlow: {
      control: 'select',
      options: ['row', 'column', 'row dense', 'column dense'],
    },
    gridAutoColumns: {
      control: 'text',
    },
    gridAutoRows: {
      control: 'text',
    },
    alignContent: {
      control: 'select',
      options: ['normal', 'stretch', 'center', 'start', 'end', 'space-around', 'space-between', 'space-evenly', 'safe center', 'unsafe center'],
    },
    justifyContent: {
      control: 'select',
      options: ['normal', 'stretch', 'center', 'start', 'end', 'left', 'right', 'space-around', 'space-between', 'space-evenly', 'safe center', 'unsafe center'],
    },
    alignItems: {
      control: 'select',
      options: ['normal', 'stretch', 'center', 'start', 'end', 'self-start', 'self-end', 'baseline', 'first baseline', 'last baseline'],
    },
    justifyItems: {
      control: 'select',
      options: [
        'legacy',
        'normal',
        'stretch',
        'center',
        'safe center',
        'unsafe center',
        'start',
        'end',
        'self-start',
        'self-end',
        'left',
        'right',
        'baseline',
        'first baseline',
        'last baseline',
      ],
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
        text: 'Grid Item 1',
      },
      {
        text: 'Grid Item 2',
      },
      {
        text: 'Grid Item 3',
      },
      {
        text: 'Grid Item 4',
      },
      {
        text: 'Grid Item 5',
      },
    ],
  },
};

function createChildren(children) {
  const html = children.map(({ text }) => {
    return `<div>${text}</div>`;
  });
  return html.join('');
}

const Template = ({
  display,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  gap,
  breakpoint,
  content,
  sx,
}) => {
  return ` 
        <cbp-grid
          ${display ? `display=${display}` : ''}
          ${gridTemplateAreas ? `grid-template-areas=${gridTemplateAreas}` : ''}
          ${gridTemplateColumns ? `grid-template-columns=${gridTemplateColumns}` : ''}
          ${gridTemplateRows ? `grid-template-rows=${gridTemplateRows}` : ''}
          ${gridAutoFlow ? `grid-auto-flow=${gridAutoFlow}` : ''}
          ${gridAutoColumns ? `grid-auto-columns=${gridAutoColumns}` : ''}
          ${gridAutoRows ? `grid-auto-rows=${gridAutoRows}` : ''}
          ${alignItems ? `align-items=${alignItems}` : ''}
          ${alignContent ? `align-content=${alignContent}` : ''}
          ${justifyItems ? `justify-items=${justifyItems}` : ''}
          ${justifyContent ? `justify-content=${justifyContent}` : ''}
          ${gap ? `gap=${gap}` : ''}
          ${breakpoint ? `breakpoint=${breakpoint}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${createChildren(content)}
        </cbp-grid>
      `;
};

export const Grid = Template.bind({});
Grid.args = {
  gridTemplateColumns: 'repeat(5,1fr)',
  gap: '1rem',
};
