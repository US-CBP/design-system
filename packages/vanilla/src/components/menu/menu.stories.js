export default {
  title: 'Patterns/Menu',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    menuPosition: {
      name: 'Menu Position',
      description: 'The positioning of the menu relative to the control.',
      control: 'select',
        options: [
          'Bottom start',
          'Bottom end',
          'Top start',
          'Top end'
        ],
    },
    buttonFill: {
      name: 'Button Fill',
      description: 'The menu button styling may vary based on context and placement of the component.',
      control: 'radio',
        options: [
          'outline',
          'ghost'
        ],
    },
    /*
    controlIcon: {
      name: 'Control Icon',
      description: 'Common options for an icon in the overflow menu pattern.',
      control: { type: 'text' }
    },
    controlLabel: {
      name: 'Control Label',
      description: 'Label text on the menu control.',
      control: { type: 'text' }
    },
    */
    controlID: {
      name: 'Control ID',
      description: 'The unique `id` of the menu control (button), used to make associations for accessibility purposes.',
      control: { type: 'text' }
    },
    menuID: {
      name: 'Menu ID',
      description: 'The unique `id` of the menu element, used to make associations for accessibility purposes.',
      control: { type: 'text' }
    },
    controlAriaLabel: {
      name: 'Control ARIA Label',
      description: 'The menu control\'s accessible label, required when the control contains only an icon.',
      control: { type: 'text' }
    },
  }
};

const OverflowMenuTemplate = ({buttonFill, menuPosition, controlLabel, controlAriaLabel, controlID, menuID}) => {
  const position = menuPosition.toLowerCase().replace(' ','-');

  return `
    <div class="cbp-menu">
      <button
        type="button"
        aria-haspopup="menu"
        aria-controls="${menuID}"
        aria-label="${controlAriaLabel}"
        id="${controlID}"
        class="cbp-menu__control cbp-btn-square cbp-btn__secondary-${buttonFill}"
      >
        <i class="fas fa-ellipsis-v"></i>${controlLabel!=undefined ? controlLabel : ''}
      </button>

      <ul
        role="menu"
        id="${menuID}"
        class="cbp-menu__menu cbp-menu--${position}"
        aria-labelledby="${controlID}"
      >
        <li class="cbp-menu__item">
          <a href="#">First Option</a>
        </li>
        <li class="cbp-menu__item">
          <a href="#">Second Option</a>
        </li>
        <li class="cbp-menu__item">
          <a href="#">Third Option</a>
        </li>
        <li class="cbp-menu__item">
          <button class="cbp-menu__close-btn">
            <i class="fas fa-times-circle"></i>Close
          </button>
        </li>
      </ul>
    </div>
  `
}

const OverflowMenuOptionsTemplate = ({buttonFill, menuPosition, controlLabel, controlAriaLabel, controlID, menuID}) => {
  const position = menuPosition.toLowerCase().replace(' ','-');

  return `
    <div class="cbp-menu cbp-overflow-menu__wrapper">
      <button 
        type="button"
        aria-haspopup="menu"
        aria-controls="${menuID}"
        aria-label="${controlAriaLabel}"
        id="menubutton2"
        class="cbp-menu__control cbp-btn-square cbp-btn__secondary-${buttonFill}"
      >
        <i class="fas fa-ellipsis-v"></i>${controlLabel!=undefined ? controlLabel : ''}
      </button>

      <ul 
        role="menu"
        id="${menuID}"
        class="cbp-menu__menu cbp-menu--${position}"
        aria-labelledby="${controlID}"
      >
        <li class="cbp-menu__item">
          <a href="#"><i class="fas fa-sync-alt"></i>Refresh</a>
        </li>
        <li class="cbp-menu__item">
          <a href="#"><i class="fas fa-copy"></i>Copy</a>
        </li>
        <li class="cbp-menu__item">
          <button><i class="fas fa-download"></i>Export as .csv</button>
        </li>
        <li class="cbp-menu__item cbp-menu__item--danger">
          <button><i class="fas fa-trash-alt"></i>Delete</button>
        </li>
        <li class="cbp-menu__item">
          <button 
            type="button"
            class="cbp-menu__close-btn"
          >
            <i class="fas fa-times-circle"></i>Close
          </button>
        </li>
      </ul>
    </div>
  `
}

export const OverflowMenu = OverflowMenuTemplate.bind({});
OverflowMenu.args = {
  menuPosition: 'Bottom start',
  buttonFill: "ghost",
  controlID: "menubutton1",
  menuID: "menu1",
  controlAriaLabel: "More Options"
}
OverflowMenu.storyName="Overflow Menu";

export const OverflowMenuOptions = OverflowMenuOptionsTemplate.bind({});
OverflowMenuOptions.args = {
  menuPosition: 'Bottom start',
  buttonFill: "outline",
  controlID: "menubutton2",
  menuID: "menu2",
  controlAriaLabel: "More Options"
}
OverflowMenuOptions.storyName="Overflow Menu - More Options";
