export default {
  title: 'Navigation/Sub-Navigation',
  tags: ['new'],
  argTypes: {
    accessibilityText: {
      description: 'Sets accessibilityText prop for the subnav component',
      control: 'text',
    },
    flat: {
      description: '',
      control: 'boolean'
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

function generateContent(items, context) {
  const html = items.map(({ icon, label, href, open, children, current }) => {
    return `
      <cbp-subnav-item 
        label="${label}" 
        href="${href}"
        ${current ? 'current' : ``} 
        ${open ? 'open' : ``} 
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      >
        ${icon ? `<span slot="cbp-subnav-item-label">${icon}${label}</span>` : ``} ${children ? generateContent(children, context) : ''}
      </cbp-subnav-item>
    `;
  });
  return html.join('');
}


const SubnavTemplate = ({ items, accessibilityText, flat, context, sx }) => {
  
  // preventDefault on all links in the subnav
  setTimeout(() => {
    let anchors = document.querySelectorAll('cbp-subnav a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { 
        e.preventDefault(); 
      })
    });
  }, 500);

  return ` 
    <cbp-subnav
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ``}
      ${flat ? 'flat' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${generateContent(items, context)}
    </cbp-subnav>
  `;
};

export const Subnav = SubnavTemplate.bind({});

Subnav.storyName = 'Sub-Navigation';
Subnav.args = {
  items: [
    {
      icon: `<cbp-icon name="home" size="var(--cbp-space-5x)"></cbp-icon> `,
      label: `Subnav Item 1`,
      href: '?path=/story/components-sub-navigation--subnav',
      current: false,
    },
    {
      label: "Subnav Item 2",
      href: '?path=/story/components-sub-navigation--subnav',
      open: false,
      current: false,
      children: [
        {
          label: "Subnav Item 2-1",
          href: '?path=/story/components-sub-navigation--subnav',
          open: false,
          current: false,
          children: [
            {
              label: "Subnav Item 2-1-1",
              href: '?path=/story/components-sub-navigation--subnav',
              open: false,
              current: false,
              children: [
                {
                  label: "Subnav Item 2-1-1-1",
                  href: '?path=/story/components-sub-navigation--subnav',
                  current: false,
                },
                {
                  label: "Subnav Item 2-1-1-2",
                  href: '?path=/story/components-sub-navigation--subnav',
                  current: false,
                },
                {
                  label: "Subnav Item 2-1-1-3",
                  href: '?path=/story/components-sub-navigation--subnav',
                  current: true
                }]
            },
            {
              label: "Subnav Item 2-1-2",
              href: '?path=/story/components-sub-navigation--subnav',
              current: false,
            },
            {
              label: "Subnav Item 2-1-3",
              href: '?path=/story/components-sub-navigation--subnav',
              open: false,
              current: false,
              children: [
                {
                  label: "Subnav Item 2-1-3-1",
                  href: '?path=/story/components-sub-navigation--subnav',
                  current: false,
                },
                {
                  label: "Subnav Item 2-1-3-2",
                  href: '?path=/story/components-sub-navigation--subnav',
                  current: false,
                },
                {
                  label: "Subnav Item 2-1-3-3",
                  href: '?path=/story/components-sub-navigation--subnav',
                  current: false,
                }]
            },
          ]
        },
        {
          label: "Subnav Item 2-2",
          href: '?path=/story/components-sub-navigation--subnav',
          current: false,
        },
        {
          label: "Subnav Item 2-3",
          href: '?path=/story/components-sub-navigation--subnav',
          current: false,
        },
      ]
    },
    {
      label: "Subnav Item 3",
      href: '?path=/story/components-sub-navigation--subnav',
      open: false,
      current: false,
      children: [
        {
          label: "Subnav Item 3-1",
          href: '?path=/story/components-sub-navigation--subnav',
          current: false,
        },
        {
          label: "Subnav Item 3-2",
          href: '?path=/story/components-sub-navigation--subnav',
          current: false,
        },
        {
          label: "Subnav Item 3-3",
          href: '?path=/story/components-sub-navigation--subnav',
          current: false,
        },
      ]
    },
    {
      label: "Subnav Item 4",
      href: '?path=/story/components-sub-navigation--subnav',
      current: false,
    },
    {
      label: "Subnav Item 5",
      href: '?path=/story/components-sub-navigation--subnav',
      current: false,
    },
  ],
}