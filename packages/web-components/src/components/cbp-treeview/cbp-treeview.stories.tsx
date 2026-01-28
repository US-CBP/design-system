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
    const html = tree.map(({label, children, checked}) => {
        return `<cbp-treeview-item
            label="${label}"
            ${checked ? 'checked': ''}
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
    icon: false,
    tree: [
        {
            label: "Parent Level A 1",
            children: [
                {
                    label: "Parent Level B 1",
                    children: [  
                    {
                        label: "Parent Level C 1",
                        children: [
                            {
                                label: "Parent Level D 1",
                                children: [
                                    {
                                        label: "Parent Level E 1",
                                        children: [],
                                        checked: true,
                                    },
                                    {
                                        label: "Parent Level E 2",
                                        children: [],
                                        checked: false,
                                    },
                                ],
                                checked: false,
                            },
                            {
                                label: "Parent Level D 2",
                                children: [],
                                checked: false,
                            },
                            {
                                label: "Parent Level D 3",
                                children: [],
                                checked: false,
                            },
                        ],
                        checked: false,
                    },
                    {
                        label: "Parent Level C 2",
                        children: [],
                        checked: false,
                    },
                    {
                        label: "Parent Level C 3",
                        children: [],
                        checked: false,
                    },
                    ],
                    checked: false,
                },
                {
                    label: "Parent Level B 2",
                    children: [],
                    checked: false,
                },
                {
                    label: "Parent Level B 3",
                    children: [],
                    checked: false,
                },
            ],
            checked: false,
        },
        {
            label: "Parent Level A 2",
            children: [
                {
                    label: "Parent Level B 1",
                    children: [],
                    checked: false,
                },
                {
                    label: "Parent Level B 1",
                    children: [],
                    checked: false,
                },
            ],
            checked: false,
        },

    ]
}