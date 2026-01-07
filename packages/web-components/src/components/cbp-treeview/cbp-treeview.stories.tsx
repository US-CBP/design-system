export default {
    title: 'Components/Treeview',
    tags: ['new'],
    argTypes: {
        label : {
            description: 'Specifies Text for the Treeview, is displayed above the treeview items',
            control: 'text',
        },
        icon : {
            description: 'Toggle to show Icon with Treeview label',
            control: 'boolean'
        },
        context: {
            control: 'select',
            options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
        },
        sx: {
            description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
            control: 'object',
        },
    },
  };


function generateTreeviewitems(tree){
    const html = tree.map(({label, children}) => {
        return `<cbp-treeview-item
            label="${label}"
        >
        ${children ? generateTreeviewitems(children) : ''}
        </cbp-treeview-item>`
    });
    return html.join('');
}

const Template = ({label, tree, icon,  context, sx }) => {
    return `
    <cbp-treeview
        ${label ? `label="${label}"` : ""}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
        ${icon ?
            `<span name="cbp-treeview-label-icon">
                <cbp-icon name="user"></cbp-icon>
            </span>`
            : ''
        }
        ${generateTreeviewitems(tree)}
    </cbp-treeview>
    `;
};


export const Treeview = Template.bind({});

Treeview.args = {
    label: 'Treeview Example:', 
    icon: false,
    tree: [
        {
            label: "Parent Level A",
            children: [
                {
                    label: "Parent Level B",
                    children: [  
                    {
                        label: "Parent Level C",
                        children: [
                            {
                                label: "Parent Level D",
                                children: [
                                    {
                                        label: "Parent Level E",
                                        children: []
                                    },
                                    {
                                        label: "Parent Level E",
                                        children: []
                                    },
                                ]
                            },
                            {
                                label: "Parent Level D",
                                children: []
                            },
                            {
                                label: "Parent Level D",
                                children: []
                            },
                        ]
                    },
                    {
                        label: "Parent Level C",
                        children: []
                    },
                    {
                        label: "Parent Level C",
                        children: []
                    },
                    ]
                },
                {
                    label: "Parent Level B",
                    children: []
                },
                {
                    label: "Parent Level B",
                    children: []
                },
            ]
        },
        {
            label: "Parent Level A",
            children: [
                {
                    label: "Parent Level B",
                    children: []
                },
                {
                    label: "Parent Level B",
                    children: []
                },
            ]
        },

    ]
}