export default {
    title: 'Components/Loader',
    //tags: ['autodocs'],
    argTypes: {
        variant : {
            control: 'select',
            options: [ "circular", "linear"]
        },
        // color : {
        //     control: 'select',
        //     options: [ "progress" , "success" , "error" ]
        // },
        size : {
            control: 'select',
            options: ["large" ,  "small"]
        },
        determinate : {
            control: 'boolean'
        },
        value : {
            control: 'number',
            if: { arg: 'determinate', eq: true },
        },
        max : {
            control: 'number',
            if: { arg: 'determinate', eq: true },
        },
        min : {
            control: 'number',
            if: { arg: 'determinate', eq: true },
        },
        success : {
            control: 'boolean'
        },
        error : {
            control: 'boolean'
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
    args: {
        size: 'large'
    }
  };

const Template = ({variant, /*color,*/ size, determinate, value, max, min, success, error, context, sx }) => {
    return ` 
        <cbp-loader
            ${variant ? `variant=${variant}` : ``}
            ${size ? `size=${size}` : ``}
            ${determinate ? 'determinate' : ''}
            ${value ? `value=${value}` : ``}
            ${max ? `max=${max}` : ``}
            ${min ? `min=${min}` : ``}
            ${success ? 'success' : ''}
            ${error ? 'error' : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ``}
            >
            
        </cbp-loader>
    `;
};
  
export const Loader = Template.bind({});
  
Loader.args = {
    variant: "linear",
    value: 25,
    max: 100,
    min: 0
}