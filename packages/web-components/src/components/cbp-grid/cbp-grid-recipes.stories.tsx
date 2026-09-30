export default {
  title: 'Layout and Structure/Grid/Recipes',
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
    items: {
      name: 'Items (slotted)',
      description: 'The grid children and their contents.',
      control: 'object',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function createChildren(children) {
  const html = children.map(({ item }) => {
    return `
        ${item}
    `;
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
  items,
  sx,
}) => {
  return ` 
    <cbp-grid
      ${display ? `display="${display}"` : ''}
      ${gridTemplateAreas ? `grid-template-areas="${gridTemplateAreas}"` : ''}
      ${gridTemplateColumns ? `grid-template-columns="${gridTemplateColumns}"` : ''}
      ${gridTemplateRows ? `grid-template-rows="${gridTemplateRows}"` : ''}
      ${gridAutoFlow ? `grid-auto-flow="${gridAutoFlow}"` : ''}
      ${gridAutoColumns ? `grid-auto-columns="${gridAutoColumns}"` : ''}
      ${gridAutoRows ? `grid-auto-rows="${gridAutoRows}"` : ''}
      ${alignItems ? `align-items="${alignItems}"` : ''}
      ${alignContent ? `align-content="${alignContent}"` : ''}
      ${justifyItems ? `justify-items="${justifyItems}"` : ''}
      ${justifyContent ? `justify-content="${justifyContent}"` : ''}
      ${gap ? `gap="${gap}"` : ''}
      ${breakpoint ? `breakpoint="${breakpoint}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${createChildren(items)}
    </cbp-grid>
  `;
};


export const TwoColumn: any = Template.bind({});
TwoColumn.storyName = '2-Column Layout';
TwoColumn.args = {
  gridTemplateColumns: '15rem 1fr',
  gap: 'var(--cbp-space-4x)',
  breakpoint: '31rem',
  sx: {"height":"5rem"},
  items: [
    {
      item: `<aside style="border:solid 1px goldenrod">Sidebar</aside>`
    },
    {
      item: `<main style="border:solid 1px goldenrod">Main Content</main>`
    }
  ],
};


export const ThreeColumn: any = Template.bind({});
ThreeColumn.storyName = '3-Column Layout';
ThreeColumn.args = {
  gridTemplateColumns: '12rem 1fr 12rem',
  gap: 'var(--cbp-space-4x)',
  breakpoint: '50rem',
  sx: {"height":"5rem"},
  items: [
    {
      item: `<nav aria-label="SubNavigation" style="border:solid 1px goldenrod">Sub-Navigation</nav>`
    },
    {
      item: `<main style="border:solid 1px goldenrod">Main Content</main>`
    },
    {
      item: `<aside style="border:solid 1px goldenrod">Sidebar</aside>`
    },
  ],
};





const FluidGridTemplate = ({
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
  numberOfCards,
  sx,
}) => {
  return ` 
    <cbp-grid
      ${display ? `display="${display}"` : ''}
      ${gridTemplateAreas ? `grid-template-areas="${gridTemplateAreas}"` : ''}
      ${gridTemplateColumns ? `grid-template-columns="${gridTemplateColumns}"` : ''}
      ${gridTemplateRows ? `grid-template-rows="${gridTemplateRows}"` : ''}
      ${gridAutoFlow ? `grid-auto-flow="${gridAutoFlow}"` : ''}
      ${gridAutoColumns ? `grid-auto-columns="${gridAutoColumns}"` : ''}
      ${gridAutoRows ? `grid-auto-rows="${gridAutoRows}"` : ''}
      ${alignItems ? `align-items="${alignItems}"` : ''}
      ${alignContent ? `align-content="${alignContent}"` : ''}
      ${justifyItems ? `justify-items="${justifyItems}"` : ''}
      ${justifyContent ? `justify-content="${justifyContent}"` : ''}
      ${gap ? `gap="${gap}"` : ''}
      ${breakpoint ? `breakpoint="${breakpoint}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${generateCards(numberOfCards)}
    </cbp-grid>
  `;
};

export const FluidGridOfCards: any = FluidGridTemplate.bind({});
FluidGridOfCards.args = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(15rem,1fr))',
  gap: 'var(--cbp-space-4x)',
  numberOfCards: 10,
};

function generateCards(numberOfCards) {
  let html=''
  for (let i=0; i<numberOfCards; i++) {
    html+= `
      <cbp-card variant="decision">
        <cbp-typography
          tag="h2"
          variant="heading-md"
          slot="cbp-card-title"
          id="card-heading-${i}"
        >
          Card Title
        </cbp-typography>

        <p>Here is an example of some body text for this decision card.</p>

        <div slot="cbp-card-actions">
          <cbp-button
            tag="button"
            fill="solid"
            color="secondary"
            context="undefined"
            aria-describedby="card-heading-${i}"
          >
            Action 2
          </cbp-button>
          <cbp-button
            tag="button"
            fill="solid"
            color="primary"
            context="undefined"
            aria-describedby="card-heading-${i}"
          >
            Action 1
          </cbp-button>
        </div>
      </cbp-card>
    `
  }
  return html;
}
