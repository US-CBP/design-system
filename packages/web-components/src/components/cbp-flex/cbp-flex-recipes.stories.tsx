export default {
  title: 'Layout and Structure/Flex/Recipes',
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
    items: {
      name: 'Items (slotted)',
      description: 'The flex children and their contents.',
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

const Template = ({ display, wrap, direction, alignItems, alignContent, justifyContent, gap, breakpoint, items, sx }) => {
  return ` 
    <cbp-flex
      ${display ? `display="${display}"` : ''}
      ${wrap ? `wrap="${wrap}"` : ''}
      ${direction ? `direction="${direction}"` : ''}
      ${alignItems ? `align-items="${alignItems}"` : ''}
      ${alignContent ? `align-content="${alignContent}"` : ''}
      ${justifyContent ? `justify-content="${justifyContent}"` : ''}
      ${gap ? `gap="${gap}"` : ''}
      ${breakpoint ? `breakpoint="${breakpoint}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${createChildren(items)}
    </cbp-flex>
  `;
};



const FormGroupTemplate = ({ display, wrap, direction, alignItems, alignContent, justifyContent, gap, breakpoint, items, sx }) => {
  return ` 
    <cbp-form-field group
      label="User's Full Name" 
      description="Form field groups use flex-basis to control sizing and wrapping of the fields in the group and should linearize at the smallest breakpoint of 360px (22.5rem)."
    >
      <cbp-flex
        ${display ? `display="${display}"` : ''}
        ${wrap ? `wrap="${wrap}"` : ''}
        ${direction ? `direction="${direction}"` : ''}
        ${alignItems ? `align-items="${alignItems}"` : ''}
        ${alignContent ? `align-content="${alignContent}"` : ''}
        ${justifyContent ? `justify-content="${justifyContent}"` : ''}
        ${gap ? `gap="${gap}"` : ''}
        ${breakpoint ? `breakpoint="${breakpoint}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${createChildren(items)}
      </cbp-flex>
    </cbp-form-field>
  `;
};

export const FormFieldGroups: any = FormGroupTemplate.bind({});
FormFieldGroups.args = {
  wrap: 'wrap',
  gap: '0 var(--cbp-space-4x)',
  breakpoint: '22.5rem',
  items: [
      {
        item: `<cbp-flex-item flex-basis="10rem" flex-shrink="0">
        <cbp-form-field label="Prefix">
          <cbp-dropdown name="prefix" items='[{"label":"Attorney","value":"Attorney"},{"label":"Coach","value":"Coach"},{"label":"Dr.","value":"Dr."},{"label":"Father","value":"Father"},{"label":"Governor","value":"Governor"},{"label":"Honorable","value":"Honorable"},{"label":"Officer","value":"Officer"},{"label":"Master","value":"Master"},{"label":"Miss","value":"Miss"},{"label":"Mr.","value":"Mr."},{"label":"Mrs","value":"Mrs."},{"label":"Ms.","value":"Ms"},{"label":"President","value":"President"},{"label":"Professor","value":"Professor"},{"label":"Reverend","value":"Reverend"}]'></cbp-dropdown>
        </cbp-form-field>
      </cbp-flex-item>`,
      },
      {
        item: `<cbp-flex-item flex-basis="10rem" flex-grow="1">
        <cbp-form-field label="First Name">
          <input name="firstname" type="text">
        </cbp-form-field>
      </cbp-flex-item>`,
      },
      {
        item: `<cbp-flex-item>
        <cbp-form-field label="M.I." sx='{"width":"5ch"}'>
          <input name="middleinitial" type="text" maxlength="1">
        </cbp-form-field>
      </cbp-flex-item>`,
      },
      {
        item: `<cbp-flex-item flex-basis="10rem" flex-grow="1">
        <cbp-form-field label="Last Name">
          <input name="lastname" type="text">
        </cbp-form-field>
      </cbp-flex-item>`,
      },
      {
        item: `<cbp-flex-item flex-basis="10rem" flex-shrink="0">
        <cbp-form-field label="Suffix">
          <cbp-dropdown name="suffix" items='[{"label":"I","value":"First"},{"label":"II","value":"Second"},{"label":"III","value":"Third"},{"label":"IV","value":"Fourth"},{"label":"IX","value":"Ninth"},{"label":"JR","value":"Junior"},{"label":"SR","value":"Senior"},{"label":"V","value":"Fifth"},{"label":"VI","value":"Sixth"},{"label":"VII","value":"Seventh"},{"label":"VIII","value":"Eighth"},{"label":"X","value":"Tenth"},{"label":"XI","value":"Eleventh"},{"label":"XII","value":"Twelfth"},{"label":"XIII","value":"Thirteenth"},{"label":"XIV","value":"Fourteenth"},{"label":"XV","value":"Fifteenth"},{"label":"XVI","value":"Sixteenth"},{"label":"XVII","value":"Seventeenth"}]'></cbp-dropdown>
        </cbp-form-field>
      </cbp-flex-item>`,
      },
  ],
}


export const SplitRow: any = Template.bind({});
SplitRow.args = {
  gap: 'var(--cbp-space-4x)',
  items: [
      {
        item: '<cbp-flex-item><cbp-link href="#">Link 1</cbp-link></cbp-flex-item>',
      },
      {
        item: '<cbp-flex-item><cbp-link href="#">Link 2 is longer</cbp-link></cbp-flex-item>',
      },
      {
        item: '<cbp-flex-item flex-grow="1"><cbp-link href="#">Link 3</cbp-link></cbp-flex-item>',
      },
      {
        item: '<cbp-flex-item><cbp-link href="#">Link 4</cbp-link></cbp-flex-item>',
      },
  ],
}


export const TagsList: any = Template.bind({});
TagsList.storyName = 'Tags List (wrapping)';
TagsList.args = {
  wrap: 'wrap',
  gap: 'var(--cbp-space-2x)',
  items: [
      {
        item: '<cbp-tag>Tag 1</cbp-tag>',
      },
      {
        item: '<cbp-tag>Tag 2</cbp-tag>',
      },
      {
        item: '<cbp-tag>Tag 3</cbp-tag>',
      },
      {
        item: '<cbp-tag>Tag 4 is longer</cbp-tag>',
      },
      {
        item: '<cbp-tag>Tag 5</cbp-tag>',
      },
      {
        item: '<cbp-tag>Tag 6</cbp-tag>',
      },
  ],
}

