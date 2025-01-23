export default {
    title: 'Components/Subnav',
    //tags: ['autodocs'],
    argTypes: {
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

const Template = ({}) => {
    return ` 
        <cbp-subnav
        </cbp-subnav>
    `;
};
  
export const Subnav = Template.bind({});
  
