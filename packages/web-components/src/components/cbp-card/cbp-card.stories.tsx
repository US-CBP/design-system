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

const DecisionTemplate = ({ title, color, bodyText }) => {
  return ` 
      <cbp-app>
        <cbp-card variant="decision"  ${color ? `color=${color}` : ''}>
          <h4 slot="cardtitle">${title}</h4>
          <p>${bodyText}</p>  
          <div slot="cardactions">
            <cbp-button
              type="button"
              fill="solid"
              color="primary"
              variant="default"
            >
              Go to App
            </cbp-button>
            <cbp-button
              type="button"
              fill="solid"
              color="secondary"
              variant="default"
            >
              App Info
            </cbp-button>
          </div>
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
  bodyText: 'Here is an example of some supplementary text for this purely informational card'
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