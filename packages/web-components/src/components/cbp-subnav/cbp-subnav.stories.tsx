export default {
    title: 'Components/Sub-Navigation',
    //tags: ['autodocs'],
    argTypes: {
        accessibilitytext: {
            description: 'Sets accessibilitytext prop for the subnav component',
            control: 'text',
        },
        //TODO: no dark mode in spec for this component, leaving commented out incase we want to add dark mode later
        // context : {
        //     control: 'select',
        //     options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
        // },
        sx: {
            description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
            control: 'object',
        },
    },
  };

function generateContent(items){
    const html = items.map(({ icon, label, href, open, children, current }) => {
        return `<cbp-subnav-item label="${label}" href=${href} ${current? `current=${current}` : ``} ${open? `open=${open}` : ``}>${icon ? `<span slot="cbp-subnav-item-label">${icon} ${label}</span>` : ``} ${children? generateContent(children) : ``}</cbp-subnav-item>`;
    });
        return html.join('');
}
    
const SubnavTemplate = ({items, accessibilitytext}) => {
    return ` 
        <cbp-subnav
            ${accessibilitytext ? `accessibilitytext="${accessibilitytext}"`: ``}
            >
            ${generateContent(items)}
        </cbp-subnav>
    `;
};
  
export const Subnav = SubnavTemplate.bind({});

Subnav.storyName='Sub-Navigation';
Subnav.args = {
        items: [
            {
                icon: `<cbp-icon name="home"></cbp-icon> `,
                label: `Subnav Item 1`,
                href: './?path=/story/components-subnav--subnav',
                current: false,
            },
            {
                label: "Subnav Item 2",
                href: './?path=/story/components-subnav--subnav',
                open: undefined,
                current: false,
                children: [
                {
                    label: "Subnav Item 2-1",
                    href: './?path=/story/components-subnav--subnav',
                    open: undefined,
                    current: false,
                    children: [
                      {
                        label: "Subnav Item 2-1-1",
                        href: './?path=/story/components-subnav--subnav',
                        open: undefined,
                        current: false,
                        children: [
                        {
                            label: "Subnav Item 2-1-1-1",
                            href: './?path=/story/components-subnav--subnav',
                            current: false,
                        },
                        {
                            label: "Subnav Item 2-1-1-2",
                            href: './?path=/story/components-subnav--subnav',
                             current: false,
                        },
                        {
                            label: "Subnav Item 2-1-1-3",
                            href: './?path=/story/components-subnav--subnav',
                            current: true
                        }]
                      },
                      {
                        label: "Subnav Item 2-1-2",
                        href: './?path=/story/components-subnav--subnav',
                         current: false,
                      },
                      {
                        label: "Subnav Item 2-1-3",
                        href: './?path=/story/components-subnav--subnav',
                        open: undefined,
                        current: false,
                        children: [
                            {
                                label: "Subnav Item 2-1-3-1",
                                href: './?path=/story/components-subnav--subnav',
                                current: false,
                            },
                            {
                                label: "Subnav Item 2-1-3-2",
                                href: './?path=/story/components-subnav--subnav',
                                current: false,
                            },
                            {
                                label: "Subnav Item 2-1-3-3",
                                href: './?path=/story/components-subnav--subnav',
                                current: false,
                            }]
                      },
                    ]
                },
                {
                    label: "Subnav Item 2-2",
                    href: './?path=/story/components-subnav--subnav',
                    current: false,
                },
                {
                    label: "Subnav Item 2-3",
                    href: './?path=/story/components-subnav--subnav',
                    current: false,
                },
              ]
            },
            {
                label: "Subnav Item 3",
                href: './?path=/story/components-subnav--subnav',
                open: undefined,
                current: false,
                children: [
                {
                    label: "Subnav Item 3-1",
                    href: './?path=/story/components-subnav--subnav',
                    current: false,
                },
                {
                    label: "Subnav Item 3-2",
                    href: './?path=/story/components-subnav--subnav',
                    current: false,
                },
                {
                    label: "Subnav Item 3-3",
                    href: './?path=/story/components-subnav--subnav',
                    current: false,
                },
              ]
            },
            {
                label: "Subnav Item 4",
                href: './?path=/story/components-subnav--subnav',
                current: false,
            },
            {
                label: "Subnav Item 5",
                href: './?path=/story/components-subnav--subnav',
                current: false,
            },
        ],
}