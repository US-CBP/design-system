export default {
  title: 'Patterns/Card',
  tags: ['autodocs']
};

const Template = () => {
  return ` 
      <cbp-app>
        <cbp-card>
          <div slot="cardbody">
            <h4 slot="cardtitle">Application Name</h4>
            <p>Lorem Ipsum</p>
          </div>
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

export const Card = Template.bind({});
Card.args = {}