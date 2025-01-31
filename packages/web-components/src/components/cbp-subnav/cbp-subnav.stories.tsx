export default {
    title: 'Components/Subnav',
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

  function generateContent(items) {
    const html = items.map(({ content, href, children, current }) => {
        if(children){
            return `<cbp-subnav-item parent=true href=${href} ${current? `current=${current}` : ``}>${content}</cbp-subnav-item>` + `<section hidden>` + generateContent(children) + `</section>`;
        }else{
            return `<cbp-subnav-item href=${href} ${current? `current=${current}` : ``}>${content}</cbp-subnav-item>`;
        }
      
    });
    return html.join('');
  }

const SubnavTemplate = ({items, accessibilitytext}) => {
    return ` 
        <cbp-subnav
            accessibilitytext=${accessibilitytext}
        >
            ${generateContent(items)}
        </cbp-subnav>
    `;
};
  
export const Subnav = SubnavTemplate.bind({});

Subnav.args = {
        items: [
            {
              content: `<cbp-icon name="home"></cbp-icon> Subnav Item 1`,
              href: './?path=/story/components-subnav--subnav',
            //   current: true,
            },
            {
              content: "Subnav Item 2",
              href: './?path=/story/components-subnav--subnav',
              children: [
                {
                    content: "Subnav Item 2-1",
                    href: './?path=/story/components-subnav--subnav',
                    children: [
                      {
                          content: "Subnav Item 2-1-1",
                          href: './?path=/story/components-subnav--subnav',
                          children: [
                            {
                                content: "Subnav Item 2-1-1-1",
                                href: './?path=/story/components-subnav--subnav'
                            },
                            {
                                content: "Subnav Item 2-1-1-2",
                                href: './?path=/story/components-subnav--subnav'
                            },
                            {
                                content: "Subnav Item 2-1-1-3",
                                href: './?path=/story/components-subnav--subnav',
                                current: true
                            },
                          ]
                      },
                      {
                          content: "Subnav Item 2-1-2",
                          href: './?path=/story/components-subnav--subnav'
                      },
                      {
                          content: "Subnav Item 2-1-3",
                          href: './?path=/story/components-subnav--subnav'
                      },
                    ]
                },
                {
                    content: "Subnav Item 2-2",
                    href: './?path=/story/components-subnav--subnav'
                },
                {
                    content: "Subnav Item 2-3",
                    href: './?path=/story/components-subnav--subnav'
                },
              ]
            },
            {
              content: "Subnav Item 3",
              href: './?path=/story/components-subnav--subnav',
              children: [
                {
                    content: "Subnav Item 3-1",
                    href: './?path=/story/components-subnav--subnav'
                },
                {
                    content: "Subnav Item 3-2",
                    href: './?path=/story/components-subnav--subnav'
                },
                {
                    content: "Subnav Item 3-3",
                    href: './?path=/story/components-subnav--subnav'
                },
              ]
            },
            {
              content: "Subnav Item 4",
              href: './?path=/story/components-subnav--subnav'
            },
            {
              content: "Subnav Item 5",
              href: './?path=/story/components-subnav--subnav'
            },
        ],
}