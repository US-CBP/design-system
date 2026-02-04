export default {
    title: 'Components/Treeview',
    tags: ['new'],
    argTypes: {
        name: {
            control: 'text'
        },
        accessibilityText: {
            control: 'text'
        },
        // selectable:{
        //     description: 'Determines if the treeview will render with checkboxs',
        //     control: 'boolean'
        // },
        uid: {
            control: 'text'
        },
        context: {
            control: 'select',
            options: ["light-inverts", "light-always", "dark-inverts", "dark-always"]
        },
        sx: {
            description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
            control: 'object',
        },
    },
};


function generateTreeviewitems(tree) {
    const html = tree.map(({ label, value, children, checked }) => {
        return `<cbp-treeview-item
            label="${label}"
            ${checked ? 'checked' : ''}
            value="${value}"
        >
        ${children ? generateTreeviewitems(children) : ''}
        </cbp-treeview-item>`
    });
    return html.join('');
}

const Template = ({ tree, name, selectable, accessibilityText, uid, context, sx }) => {
    return `
    <cbp-treeview
        selectable=${selectable}
        accessibility-text="${accessibilityText}"
        name=${name}
        uid=${uid}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
        ${generateTreeviewitems(tree)}
    </cbp-treeview>
    `;
};


export const Treeview = Template.bind({});

Treeview.args = {
    tree: [
        {
            label: "Parent Level A 1",
            value: "a1",
            children: [
                {
                    label: "Parent Level B 1",
                    value: "b1",
                    children: [
                        {
                            label: "Parent Level C 1",
                            value: "c1",
                            children: [
                                {
                                    label: "Parent Level D 1",
                                    value: "d1",
                                    children: [
                                        {
                                            label: "Parent Level E 1",
                                            value: "e1",
                                            children: [],
                                            checked: true,
                                        },
                                        {
                                            label: "Parent Level E 2",
                                            value: "e2",
                                            children: [],
                                            checked: false,
                                        },
                                    ],
                                    checked: false,
                                },
                                {
                                    label: "Parent Level D 2",
                                    value: "d2",
                                    children: [],
                                    checked: false,
                                },
                                {
                                    label: "Parent Level D 3",
                                    value: "d3",
                                    children: [],
                                    checked: false,
                                },
                            ],
                            checked: false,
                        },
                        {
                            label: "Parent Level C 2",
                            value: "c2",
                            children: [],
                            checked: false,
                        },
                        {
                            label: "Parent Level C 3",
                            value: "c3",
                            children: [],
                            checked: false,
                        },
                    ],
                    checked: false,
                },
                {
                    label: "Parent Level B 2",
                    value: "b2",
                    children: [],
                    checked: false,
                },
                {
                    label: "Parent Level B 3",
                    value: "b3",
                    children: [],
                    checked: false,
                },
            ],
            checked: false,
        },
        {
            label: "Parent Level A 2",
            value: "a2",
            children: [
                {
                    label: "Parent Level B 1",
                    value: "b1-1",
                    children: [],
                    checked: false,
                },
                {
                    label: "Parent Level B 2",
                    value: "b2-1",
                    children: [],
                    checked: false,
                },
            ],
            checked: false,
        },

    ],
    name: 'treeviewExample',
    uid: 'treeview',
    selectable: true,
    accessibilityText: 'Treeview storybook example'
}