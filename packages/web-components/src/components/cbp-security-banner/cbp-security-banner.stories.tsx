export default {
  title: 'Notifications/Security Banner',
  tags: ['beta'],
  argTypes: {

    classification: {
      description: 'Determines the classification level of the banner',
      control: 'select',
      options: ['unclassified', 'cui', 'confidential']
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


const SecurityBannerTemplate = ({ classification, context, sx }) => {
  return `
    <cbp-security-banner
      classification = ${classification}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
    </cbp-security-banner>
  `;
}
  
export const Default: any = SecurityBannerTemplate.bind({});
Default.args = {
    classification: 'unclassified'
};
Default.storyName = 'Default';
