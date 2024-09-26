export default {
    title: 'Components/USA Banner',
    tags: ['autodocs'],
    argTypes: {
      // context : {
      //   control: 'select',
      //   options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
      // },
      // sx: {
      //   description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      //   control: 'object',
      // },
    },
  };
  
  const Template = () => {
    return ` 
            <cbp-usa-banner>
            </cbp-usa-banner>
        `;
  };
  
  export const usabanner = Template.bind({});
  