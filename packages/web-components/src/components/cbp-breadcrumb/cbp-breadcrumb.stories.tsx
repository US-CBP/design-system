export default {
  title: 'Navigation/Breadcrumb',
  tags: ['beta'],
  argTypes: {
    divider: {
      control: 'text',
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
  args: {
  },
};

function generateBreadcrumbs(breadcrumbs, context) {
  const html = breadcrumbs.map(({ text, href }) => {
    return `
      <cbp-link href=${generateUnvisitedLink(href)} ${context && context != 'light-inverts' ? `context="${context}"` : ''}>
        ${text}
      </cbp-link>
    `;
  }
  );
  return html.join('');
}

// Replace placeholder href="#" with unique URLs that do not show as "visited" (a common problem when using # or self-referencing URLs);
// Should also use preventDefault() to avoid navigation to a broken link.
function generateUnvisitedLink(href) {
  if(href == '#') return '?' + (Math.random() + 1).toString(26).slice(2, 7);
  else return href;
}

const Template = ({ breadcrumbs, home, divider, context, sx }) => {
  // preventDefault on all links in the breadcrumbs
  setTimeout(() => {
    let anchors = document.querySelectorAll('cbp-breadcrumb a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) { e.preventDefault(); })
    });
  }, 1000);

  return ` 
    <cbp-breadcrumb
      ${divider ? `divider="${divider}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-button
        tag="a"
        fill="ghost"
        color="primary"
        variant="square"
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        href="${home}"
        accessibility-text="Home"
      >
        <cbp-icon name="home"></cbp-icon>
      </cbp-button>
      ${generateBreadcrumbs(breadcrumbs, context)}
    </cbp-breadcrumb>
  `;
};

export const Breadcrumb = Template.bind({});
Breadcrumb.args = {
  breadcrumbs: [
    {
      text: 'Page Title Level A',
      href: '#'
    },
    {
      text: 'Page Title Level B',
      href: '#'
    },
    {
      text: 'Page Title Level C',
      href: '#'
    },
    {
      text: 'Page Title Level D',
      href: '#'
    },
  ],
  home: '#'
};