export default {
  title: 'Patterns/Card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      name: 'Title',
      description: 'Set the title in the banner area of the card',
      control: 'text'
    },
    bodyText: {
      name: 'Body Text',
      description: 'Set the body text of the card',
      control: 'text'
    }
  }
};

const GeneralTemplate = ({ color, title, bodyText }) => {
  return ` 
    <cbp-app>
      <cbp-card ${color ? `color=${color}` : ''}>
        <h4 slot="cardtitle">${title}</h4>
        <p>${bodyText}</p>
      </cbp-card>
    </cbp-app>
  `
}

const renderActions = (layout, { btn1, btn2, btn3 }) => {
  if (layout === 'double') {
    return `
      <div slot="cardactions">
        <cbp-button type="button" fill="solid" color="${btn2.color}">${btn2.label}</cbp-button>
        <cbp-button type="button" fill="solid" color="${btn1.color}">${btn1.label}</cbp-button>
      </div>
    `;
  } else if (layout === 'triple') {
    return `
      <div slot="cardactions">
        <cbp-button type="button" fill="solid" color="${btn3.color}">${btn3.label}</cbp-button>
        <cbp-button type="button" fill="solid" color="${btn2.color}">${btn2.label}</cbp-button>
        <cbp-button type="button" fill="solid" color="${btn1.color}">${btn1.label}</cbp-button>
      </div>
    `;
  } else {
    return `
      <div slot="cardactions">
        <cbp-button type="button" fill="solid" color="${btn1.color}">${btn1.label}</cbp-button>
      </div>
    `;
  }
};

const DecisionTemplate = ({ title, color, bodyText, actionsLayout, actionsConfig }) => {
  return ` 
      <cbp-app>
        <cbp-card variant="decision"  ${color ? `color=${color}` : ''}>
          <h4 slot="cardtitle">${title}</h4>
          <p>${bodyText}</p>  
          ${renderActions(actionsLayout, actionsConfig)}
        </cbp-card>
      </cbp-app>
    `
}

const BannerTemplate = ({ title, color, bodyText }) => {
  return ` 
    <cbp-app>
      <cbp-card variant="banner" ${color ? `color=${color}` : ''}>
        <h4 slot="cardtitle">${title}</h4>
        <p>${bodyText}</p>  
      </cbp-card>
    </cbp-app>
  `
}

export const GeneralCard = GeneralTemplate.bind({});
GeneralCard.args = {
  title: 'General Card',
  bodyText: 'Here is an example of some supplementary text for this purely informational card'
}
GeneralCard.argTypes = {
  color: {
    name: 'Color',
    description: 'Set the color of the card',
    control: 'select',
    options: [
      'default',
      'info',  
      'success',
      'warning',
      'danger'
    ]
  }
}

export const DecisionCard = DecisionTemplate.bind({});
DecisionCard.args = {
  title: 'Application Name',
  bodyText: 'Here is an example of some supplementary text for this purely informational card',
  actionsLayout: 'single',
  actionsConfig: {
    btn1: {
      label: 'Label',
      color: 'tertiary'
    },
    btn2: {
      label: 'Label',
      color: 'secondary'
    },
    btn3: {
      label: 'label',
      color: 'primary'
    }
  }
}
DecisionCard.argTypes = {
  color: {
    name: 'Color',
    description: 'Set the color of the card',
    control: 'select',
    options: [
      'default',
      'danger'
    ]
  },
  actionsLayout: {
    name: 'Actions Layout',
    description: 'Choose actions layout of the card component',
    control: 'radio',
    options: ['single', 'double', 'triple']
  },
  actionsConfig: {
    name: 'Decision Card Actions',
    description: 'Configure card button labels and colors. Available button colors: `primary`, `secondary`, `tertiary` and `danger`',
    control: 'object'
  }
}

export const BannerCard = BannerTemplate.bind({});
BannerCard.args = {
  title: 'Banner Card',
  bodyText: 'Here is an example of some supplementary text for this purely informational card'
}
BannerCard.argTypes = {
  color: {
    name: 'Color',
    description: 'Set the color of the card',
    control: 'select',
    options: [
      'default',
      'info',  
      'success',
      'warning',
      'danger'
    ]
  }
}