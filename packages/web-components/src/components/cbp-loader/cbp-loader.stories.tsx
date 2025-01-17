export default {
    title: 'Components/Loader',
    //tags: ['autodocs'],
    argTypes: {
        uid: {
            description: 'A unique `id` applied to the dialog and referenced by the control.',
            control: 'text',
          },
        variant : {
            control: 'select',
            options: [ "circular", "linear"]
        },
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
        label : {
            control: 'text',
            if: { arg: 'determinate', eq: true}
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

const Template = ({uid, variant, label, size, determinate, value, max, success, error, context, sx }) => {
    return ` 
        <cbp-loader
            ${uid ? `uid=${uid}` : ''}
            ${variant ? `variant=${variant}` : ``}
            ${size ? `size=${size}` : ``}
            ${determinate ? 'determinate' : ''}
            ${value ? `value=${value}` : ``}
            ${max ? `max=${max}` : ``}
            ${success ? 'success' : ''}
            ${error ? 'error' : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ``}
            >
            ${variant == 'linear' && label && !(success || error)? 
            `<label slot='cbp-loader-desc'> ${label}</label>`
            : ``
            }
        </cbp-loader>
    `;
};
  
export const Loader = Template.bind({});
  
Loader.args = {
    variant: "linear",
    value: 25,
    max: 100,
    label: 'Uploading...'
}