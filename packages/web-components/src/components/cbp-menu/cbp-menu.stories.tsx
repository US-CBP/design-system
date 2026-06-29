export default {
  title: 'Navigation/Menu',
  parameters: {
    layout: 'centered',
  },
  tags: ['beta'],
  argTypes: {
    position: {
      control: 'select',
      options: [ 'bottom-start', "bottom-end", 'top-start', "top-end"]
    },
    context : {
      control: 'select',
      options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function generateMenuItem(items){
  const html = items.map(({tag, color, icon, text}) =>{
    return `
    <cbp-menu-item
      ${color ? `color="${color}"` : ``}
    >
      <${tag}>
        ${icon ? `<cbp-icon name="${icon}"></cbp-icon>` : ``}
        ${text}
      </${tag}>
    </cbp-menu-item>
    `
  })
  return html.join('');
}

const Template = ({ position, context, sx }) => {
  return ` 
    <cbp-menu
      uid="menuId"
      ${position ? `position="${position}"` : ''}
      ${context ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-button
        fill="outline"
        color="secondary"
        target-prop="open"
        controls="menuId"
      >   
        <cbp-icon name="bars"></cbp-icon>     
        Menu
      </cbp-button>

      <cbp-menu-item>
        <a href="#">Option 1</a>
      </cbp-menu-item>
      <cbp-menu-item>
        <a href="#">Option 2</a>
      </cbp-menu-item>
      <cbp-menu-item>
        <a href="#">Option 3 is longer</a>
      </cbp-menu-item>
      <cbp-menu-item>
        <a href="#">Option 4</a>
      </cbp-menu-item>
    </cbp-menu>
  `;
};

export const Menu = Template.bind({});
Menu.args = {};



const ActionsMenuTemplate = ({ position, items, context, sx }) => {
  return ` 
    <cbp-menu
      uid="menuId"
      ${position ? `position="${position}"` : ''}
      ${context ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >

      <cbp-button
        fill="outline"
        color="secondary"
        variant="square"
        accessibility-text="Actions"
        target-prop="open"
        controls="menuId"
      >
        <cbp-icon name="ellipsis-vertical"></cbp-icon>
      </cbp-button>

      ${generateMenuItem(items)}
      
    </cbp-menu>
  `;
};

export const ActionsMenu = ActionsMenuTemplate.bind({});
ActionsMenu.args = {
  items:[
    {
      tag: 'cbp-link',
      icon:'eye',
      text: 'View'
    },
    {
      tag: 'cbp-button tag="a"',
      icon: 'pen-to-square',
      text: 'Edit'
    },
    {
      tag: 'cbp-button tag="button"',
      icon: 'trash',
      color: 'danger',
      text: 'Delete'
    },
  ]
};


/* Old menu code
      <cbp-menu-item>
        <cbp-button> 
          <cbp-icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
          </cbp-icon>
          Refresh
        </cbp-button>
      </cbp-menu-item>
      <cbp-menu-item>
        <cbp-button> 
          <cbp-icon name="clone"></cbp-icon>
          Copy
        </cbp-button>
      </cbp-menu-item>
      <cbp-menu-item>
        <cbp-button fill="ghost" color="secondary">  
          <cbp-icon name="arrow-right"></cbp-icon>
          Export as .csv
        </cbp-button>
      </cbp-menu-item>
      <cbp-menu-item color="danger">
        <cbp-button fill="ghost" color="danger">   
          <cbp-icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </cbp-icon>
          Delete
        </cbp-button>
      </cbp-menu-item>
*/