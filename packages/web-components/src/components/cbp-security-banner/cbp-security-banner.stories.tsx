export default {
  title: 'Notifications/Security Banner',
  tags: ['beta'],
  argTypes: {

    classification: {
      description: 'Determines the classification level of the banner',
      control: 'select',
      options: ['unclassified', 'cui', 'confidential']
    },
    open:{
      description: 'Determines if the content of the banner is visible',
      control: 'boolean'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};


const SecurityBannerTemplate = ({ classification, open, sx }) => {
  return `
    <cbp-security-banner
      ${open ? 'open': ``}
      ${classification ? `classification= ${classification}` : ``}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
    </cbp-security-banner>
  `;
}
  
export const SecurityBanner: any = SecurityBannerTemplate.bind({});