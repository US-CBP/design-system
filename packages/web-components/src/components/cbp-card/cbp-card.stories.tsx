export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      name: 'Title (slotted)',
      description: 'Set the title in the banner area of the card',
      control: 'text',
    },
    bodyText: {
      name: 'Body Text (slotted)',
      description: 'Set the body text of the card',
      control: 'text',
    },
    // color: {
    //   control: 'select',
    //   options: ['default', 'info', 'success', 'warning', 'danger'],
    // },
    stretch: {
      control: 'boolean',
    },
    withIcon: {
      control: 'boolean',
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

const renderActions = (layout, color, context, withIcon, { btn1, btn2, btn3 }) => {
  
  
  if (layout === 'double') {
    return `
      <div slot="cbp-card-actions">
        <cbp-button tag="${btn2.tag}" ${btn2.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn2.color}" context="${context}" aria-describedby="card-heading-1">
          ${withIcon ? `<cbp-icon name='arrow-right' sx='{"display":"inline", "padding-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>` : ''}
          ${btn2.label}
        </cbp-button>
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} fill="solid" color="${color == 'danger' ? 'danger' : btn1.color}" context="${context}" aria-describedby="card-heading-1">
          ${withIcon ? `<cbp-icon name='check' sx='{"display":"inline", "padding-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>` : ''}
          ${btn1.label}
        </cbp-button>
      </div>
    `;
  } else if (layout === 'triple') {
    return `
      <div slot="cbp-card-actions">
        <cbp-button tag="${btn3.tag}" ${btn3.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn3.color}" context="${context}" aria-describedby="card-heading-1">
          ${withIcon ? `<cbp-icon name='eye' sx='{"display":"inline", "padding-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>` : ''} 
          ${btn3.label}
        </cbp-button>
        <cbp-button tag="${btn2.tag}" ${btn2.tag == 'a' ? `href="#"` : ''} fill="solid" color="${btn2.color}" context="${context}" aria-describedby="card-heading-1">
          ${withIcon ? `<cbp-icon name='arrow-right' sx='{"display":"inline", "padding-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>` : ''}
          ${btn2.label}
        </cbp-button>
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} fill="solid" color="${color == 'danger' ? 'danger' : btn1.color}" context="${context}" aria-describedby="card-heading-1">
          ${withIcon ? `<cbp-icon name='check' sx='{"display":"inline", "padding-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>` : ''}
          ${btn1.label}
        </cbp-button>
      </div>
    `;
  } else {
    return `
      <div slot="cbp-card-actions">
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} fill="solid" color="${color == 'danger' ? 'danger' : btn1.color}" context="${context}" aria-describedby="card-heading-1">
          ${withIcon ? `<cbp-icon name='check' sx='{"display":"inline", "padding-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>` : ''}
          ${btn1.label}
        </cbp-button>
      </div>
    `;
  }
};

const GeneralTemplate = ({ color, title, bodyText, withIcon, context, sx }) => {
  return ` 
    <cbp-card
      ${color ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}      
      ${sx ? 'sx=' + JSON.stringify(sx) : ''}
    >
      <cbp-typography tag='h4' slot="cbp-card-title">
        ${withIcon ? `<cbp-icon name='triangle-exclamation' size='1.25rem'></cbp-icon>` : ''}
        ${title}
      </cbp-typography>
      <p>${bodyText}</p>
    </cbp-card>
  `;
};

const DecisionTemplate = ({ title, color, bodyText, actionsLayout, actionsConfig, withIcon, context, sx }) => {
  return ` 
    <cbp-card
      variant="decision" 
      ${color ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? 'sx=' + JSON.stringify(sx) : ''}
    >
      <cbp-typography tag='h4' slot="cbp-card-title" id="card-heading-1">
        ${withIcon ? `<cbp-icon name='triangle-exclamation' size='1.25rem'></cbp-icon>` : ''}
        ${title}
      </cbp-typography>
      <p>${bodyText}</p>  
      ${renderActions(actionsLayout, color,context, withIcon, actionsConfig)}
    </cbp-card>
  `;
  // <h4 slot="cbp-card-title" id="card-heading-1">
  //       ${withIcon ? `<cbp-icon name='triangle-exclamation' size='1.25rem'></cbp-icon>` : ''}
  //       ${title}
  //     </h4>
};

const BannerTemplate = ({ title, color, bodyText, withIcon, context, sx }) => {
  return ` 
    <cbp-card
      variant="banner"
      ${color ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? 'sx=' + JSON.stringify(sx) : ''}
    >
      <cbp-typography tag='h4' slot="cbp-card-title">
        ${withIcon ? `<cbp-icon name='triangle-exclamation' size='1.25rem'></cbp-icon>` : ''}
        ${title}
      </cbp-typography>
      <p>${bodyText}</p>  
    </cbp-card>
  `;
};

//documentation for dicebear(image generator in below) https://www.dicebear.com/how-to-use/http-api/
const FlagTemplate = ({ title, color, bodyText, withIcon, context, sx }) => {
  return ` 
    <cbp-card
      variant='flag'
      ${color ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? 'sx=' + JSON.stringify(sx) : ''}
    >
      <div slot='cbp-card-flag'>
          <img src="https://api.dicebear.com/9.x/personas/svg" />
      </div>
      <cbp-typography tag='h4' slot="cbp-card-title">
        ${withIcon ? `<cbp-icon name='triangle-exclamation' size='1.25rem'></cbp-icon>` : ''}
        ${title}
      </cbp-typography>
      <p>${bodyText}</p>  
    </cbp-card>
  `;
};

const InteractiveTemplate = ({ title, color, disabled, bodyText, withIcon, interactive, href, variant, context, sx }) => {
  return ` 
    <cbp-card
      ${variant !=='general' ? `variant=` + variant : ''}
      ${interactive ? `interactive=${interactive}` : ''}
      ${href ? `href=${href}` : ''}
      ${disabled ? `disabled=${disabled}` : ''}
      ${color ? `color=${color}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? 'sx=' + JSON.stringify(sx) : ''}
    >
      
      ${variant=== 'flag' ? `<div slot='cbp-card-flag'><img src="https://api.dicebear.com/9.x/personas/svg" /></div>` : ''}
      <cbp-typography tag='h4' slot="cbp-card-title">
        ${withIcon ? `<cbp-icon name='triangle-exclamation' size='1.25rem'></cbp-icon>` : ''}
        ${title}
      </cbp-typography>
      <p>${bodyText}</p>  
    </cbp-card>
  `;
};

// For testing only:
/*
const CardsGridTemplate = ({ title, color, stretch, bodyText, actionsLayout, actionsConfig, sx }) => {
  return ` 
    <cbp-flex
      wrap="wrap"
      gap="1rem"
      align-items="stretch"
    >
      <cbp-flex-item flex-basis="15rem">
      <cbp-card 
        variant="decision"
        ${stretch ? 'stretch' : ''}
        ${color ? `color=${color}` : ''}
        ${sx ? 'sx='+JSON.stringify(sx) : ''}
      >
        <h4 slot="cbp-card-title">${title}</h4>
        <p>${bodyText}</p>
        ${renderActions(actionsLayout, actionsConfig)}
      </cbp-card>
      </cbp-flex-item>

      <cbp-flex-item flex-basis="15rem">
      <cbp-card 
        variant="decision"
        ${stretch ? 'stretch' : ''}
        ${color ? `color=${color}` : ''}
        ${sx ? 'sx='+JSON.stringify(sx) : ''}
      >
        <h4 slot="cbp-card-title">${title}</h4>
        <p>
          ${bodyText}
          ${bodyText}
          ${bodyText}
        </p>
        ${renderActions(actionsLayout, actionsConfig)}
      </cbp-card>
      </cbp-flex-item>

      <cbp-flex-item flex-basis="15rem">      
      <cbp-card 
        variant="decision"  
        ${stretch ? 'stretch' : ''}
        ${color ? `color=${color}` : ''}
        ${sx ? 'sx='+JSON.stringify(sx) : ''}
      >
        <h4 slot="cbp-card-title">${title}</h4>
        <p>${bodyText}</p>
        ${renderActions(actionsLayout, actionsConfig)}
      </cbp-card>
      </cbp-flex-item>
    </cbp-flex>
  `;
};
export const CardsGrid = CardsGridTemplate.bind({});
CardsGrid.argTypes = {
  actionsLayout: {
    name: 'Actions Layout',
    description: 'Choose actions layout of the card component',
    control: 'radio',
    options: ['single', 'double', 'triple'],
  },
  actionsConfig: {
    name: 'Decision Card Actions',
    description: 'Configure card button labels and colors. Available button colors: `primary`, `secondary`, `tertiary` and `danger`',
    control: 'object',
  },
};
CardsGrid.args = {
  title: 'Banner Card Title',
  bodyText: 'Here is an example of some supplementary text for this purely informational card.',
  actionsLayout: 'single',
  actionsConfig: {
    btn1: {
      label: 'Action 1',
      tag: 'button',
      color: 'primary',
    },
    btn2: {
      label: 'Action 2',
      tag: 'button',
      color: 'secondary',
    },
    btn3: {
      label: 'Action 3',
      tag: 'button',
      color: 'tertiary',
    },
  },
};
*/

export const GeneralCard = GeneralTemplate.bind({});
GeneralCard.args = {
  title: 'Card Title',
  bodyText: 'Here is an example of some body text for this purely informational card',
};
GeneralCard.argTypes = {};

export const DecisionCard = DecisionTemplate.bind({});
DecisionCard.args = {
  title: 'Card Title',
  bodyText: 'Here is an example of some body text for this decision card.',
  actionsLayout: 'single',
  actionsConfig: {
    btn1: {
      label: 'Action 1',
      tag: 'button',
      color: 'primary',
    },
    btn2: {
      label: 'Action 2',
      tag: 'button',
      color: 'secondary',
    },
    btn3: {
      label: 'Action 3',
      tag: 'button',
      color: 'tertiary',
    },
  },
};
DecisionCard.argTypes = {
  color: {
    name: 'Color',
    description: 'Set the color of the card',
    control: 'select',
    options: ['default', 'danger'],
  },
  actionsLayout: {
    name: 'Actions Layout',
    description: 'Choose actions layout of the card component',
    control: 'radio',
    options: ['single', 'double', 'triple'],
  },
  actionsConfig: {
    name: 'Decision Card Actions',
    description: 'Configure card button labels and colors. Available button colors: `primary`, `secondary`, `tertiary` and `danger`',
    control: 'object',
  },
};

export const BannerCard = BannerTemplate.bind({});
BannerCard.args = {
  title: 'Banner Card Title',
  bodyText: 'Here is an example of some supplementary text for this purely informational card',
};

export const FlagCard = FlagTemplate.bind({});
FlagCard.args = {
  title: 'Card Title',
  bodyText: 'Here is an example of some body text for this purely informational card',
};
FlagCard.argTypes = {
  color: {
    name: 'Color',
    description: 'Set the color of the card',
    control: 'select',
    options: ['default', 'info', 'success', 'warning', 'danger'],
  },
};

export const InteractiveCard = InteractiveTemplate.bind({});
InteractiveCard.args = {
  title: 'Banner Card Title',
  bodyText: 'Here is an example of some supplementary text for this purely informational card',
  interactive: 'clickable',
  variant: 'general'
};

InteractiveCard.argTypes = {
  interactive: {
    name: 'Interactive',
    description: 'Set the interactivity of the card',
    control: 'select',
    options: ['clickable', 'select', 'multi'],
  },
  href:{
    control: 'text'
  },
  disabled: {
    control: 'boolean',
  },
  color: {
    control: 'select',
    options: ['default', 'danger'],
  },
  variant: {
    name: 'Variant',
    description: 'set Variant of the card',
    control: 'select',
    options: ['general', 'decision', 'flag']
  },
};