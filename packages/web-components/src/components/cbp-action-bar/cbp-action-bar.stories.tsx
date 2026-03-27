export default {
  title: 'Content/Action Bar',
  tags: ['beta'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'floating', 'sticky'],
    },
    context: {
      control: 'select',
      options: ['light-inverts', 'light-always', 'dark-inverts', 'dark-always'],
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {},
};

const Template = ({ actionBarInfo, variant, context }) => {
  return `  
    <cbp-action-bar 
      ${variant ? `variant="${variant}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}   
    >
      <cbp-typography 
        slot="cbp-action-bar-info"
        tag="div"
      >
        ${actionBarInfo}
      </cbp-typography>
      <cbp-button 
        fill="ghost"
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}   
      >
        Action 1
      </cbp-button>
      <cbp-button 
        fill="ghost"
        color="secondary"
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}     
      >
        Action 2
      </cbp-button>
    </cbp-action-bar>
  `;
};

export const ActionBar = Template.bind({});
ActionBar.args = {
  actionBarInfo: `0 items selected.`,
};

const actionBarInDrawer = ({ variant, actionBarInfo, context, sx }) => {
  return ` 
    <cbp-button
      type="button"
      color="secondary"
      variant="square"
      accessibility-text="Open Drawer"
      target-prop="open"
      controls="actionbarDrawer"
    >
      <cbp-icon name="bars"></cbp-icon>
    </cbp-button>

    <cbp-drawer
      position="left"
      uid="actionbarDrawer"
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-panel
        aria-labelledby="panelheader"
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="panelheader"
        >
          Drawer Header
        </cbp-typography>

        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</p>
        
        <cbp-accordion
          multiple
          ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        >
          <cbp-accordion-item>
            <div slot="cbp-accordion-item-label">
              <cbp-typography
                variant="heading-sm"
              >Test Accordion</cbp-typography>
            </div>

            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</p>
          </cbp-accordion-item>

          <cbp-accordion-item>
            <div slot="cbp-accordion-item-label">
              <cbp-typography
                variant="heading-sm"
              >Test Accordion</cbp-typography>
            </div>

            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</p>
          </cbp-accordion-item>
        </cbp-accordion>
      </cbp-panel>

      <cbp-action-bar
        ${variant ? `variant=${variant}` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <cbp-typography 
          slot="cbp-action-bar-info"
          tag="div"
        >
          ${actionBarInfo}
        </cbp-typography>
        <cbp-button 
          ${context && context != 'light-inverts' ? `context="${context}"` : ''}   
          fill="ghost"
        >
          Action 1
        </cbp-button>
        <cbp-button 
          ${context && context != 'light-inverts' ? `context="${context}"` : ''}     
          fill="ghost"
          color="secondary"
        >
          Action 2
        </cbp-button>
      </cbp-action-bar>
    </cbp-drawer>
  `;
};

export const ActionBarDrawer = actionBarInDrawer.bind({});
ActionBarDrawer.args = {
  variant: 'sticky',
  actionBarInfo: `0 items selected.`,
};
