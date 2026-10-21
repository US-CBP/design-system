export default {
  title: 'Layout and Structure/Footer',
  tags: ['beta'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    footerNav: {
      name: 'Footer Navigation',
      description: 'Configure various aspects of the footer navigation shown.',
      control: 'object',
    },
    logoSrc: {
      description: 'The src to the large-viewport seal/branding.',
      control: 'text',
    },
  },
};

function generateFooterNav(footerNav) {
  const html = footerNav.map(({ label, href }) => {
    return `
          <cbp-flex-item role="listitem">
            <cbp-button tag="a" href=${href} color="secondary" fill="ghost" context="dark-always">
              ${label}
            </cbp-button>
          </cbp-flex-item>
    `;
  });
  return html.join('');
}

function generateLink(href) {
  if(href == '#') return '?' + (Math.random() + 1).toString(26).slice(2, 7);
  else return href;
}

function generateLinkListItem(linkList) {
  const html = linkList.map(({value, href}) => {
    return `
    <li>
      <cbp-link href="${generateLink(href)}">
        <cbp-icon name="arrow-right"></cbp-icon>
        <cbp-link href="${generateLink(href)}">${value}</cbp-link>
      </cbp-link>
    </li>
    `;
  });
  return html.join('');
}

const InternalTemplate = ({ footerNav, logoSrc }) => {
  return `
    <cbp-footer 
      data-cbp-container-context="dark"
      ${logoSrc ? `logo-src=${logoSrc}` : ''}
      >
      <nav slot="cbp-footer-nav" aria-label="Footer Navigation">
        <cbp-flex role="list" breakpoint="37.5rem">
          ${generateFooterNav(footerNav)}
        </cbp-flex>
      </nav>

      <section>
        <cbp-typography tag="span" variant="heading-xs" context="dark-always" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>
          <cbp-icon name='headset' size='1.25rem'> </cbp-icon>
          Application Support
        </cbp-typography>
            
        <cbp-flex gap="var(--cbp-space-2x)" wrap="wrap">
          <span><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></span>
          <cbp-flex gap="var(--cbp-space-2x)" wrap="wrap">
            <span><b>Email: </b><cbp-link href="mailto:somebody@example.com" context="dark-always" >this-application-support@abc.def.gov</cbp-link></span>
            <span><b>CBP Helpdesk: </b><cbp-link href="tel:555-555-5555" context="dark-always" >(555) 555-5555</cbp-link></span>
          </cbp-flex>
        </cbp-flex>
      </section>
    </cbp-footer>
  `;
};

export const InternalFooter = InternalTemplate.bind({});
InternalFooter.args = {
  footerNav: [
    {
      label: 'App Overview',
      href: '#',
    },
    {
      label: 'Trainings',
      href: '#',
    },
    {
      label: 'FAQs',
      href: '#',
    },
    {
      label: 'Release Notes',
      href: '#',
    },
  ],
  logoSrc: "./assets/images/cbp-seal.svg"
};
InternalFooter.storyName = 'Internal';

const ExternalTemplate = ({ footerNav, linkList, logoSrc}) => {
  //TODO: style tag added since ul cannot be directly targetted, should this move to component css?
   return `
    <cbp-footer 
      data-cbp-container-context="dark"
      ${logoSrc ? `logo-src=${logoSrc}` : ''}
      >
      <nav slot="cbp-footer-nav" aria-label="Footer Navigation">
        <cbp-flex role="list" breakpoint="37.5rem">
          ${generateFooterNav(footerNav)}
        </cbp-flex>
      </nav>

      <style>
        cbp-list ul{column-count: auto; column-width: 200px;}
      </style>
      <cbp-flex>
        <cbp-flex-item flex-grow=1>
          <cbp-list variant="link" size="normal">
              ${generateLinkListItem(linkList)}
          </cbp-list>
          
        </cbp-flex-item>
        <cbp-flex
          direction="column"
          align-items="center"
          gap="var(--cbp-space-4x)"
        >
          <iframe src="https://www.dhs.gov/ntas/" name="National Terrorism Advisory System" title="National Terrorism Advisory System" height="185px" width="174px"></iframe>
          <cbp-button 
            type="button" 
            fill="ghost" 
            color="secondary"
          >
            <cbp-icon name="arrow-right"></cbp-icon>
            Learn More
          </cbp-button>
        </cbp-flex>
      </cbp-flex>
    </cbp-footer>
  `;
};
export const ExternalFooter = ExternalTemplate.bind({});
ExternalFooter.args = {
  footerNav: [ //TODO: replace labels with social media icons. Do I need to add said icons to the design system or is there a different approach prefered
    {
      label: 'App Overview',
      href: '#',
    },
    {
      label: 'Trainings',
      href: '#',
    },
    {
      label: 'FAQs',
      href: '#',
    },
    {
      label: 'Release Notes',
      href: '#',
    },
  ],
  linkList: [
    {
      value: "About CBP",
      href: '#'
    },
    {
      value: "Section 508 Accessibility",
      href: '#'
    },
    {
      value: "Accountability",
      href: '#'
    },
    {
      value: "DHS Components",
      href: '#'
    },
    {
      value: "Forms",
      href: '#'
    },
    {
      value: "Freedom of Information Act (FOIA)",
      href: '#'
    },
    {
      value: "Inspector General",
      href: '#'
    },
    {
      value: "No FEAR Act",
      href: '#'
    },
    {
      value: "Vulnerability Disclosure Program",
      href: '#'
    },
    {
      value: "Privacy",
      href: '#'
    },
    {
      value: "Contact Us",
      href: '#'
    },
    {
      value: "Site Policies",
      href: '#'
    },
    {
      value: "The White House",
      href: '#'
    },
    {
      value: "USA.gov",
      href: 'https://www.usa.gov/'
    },
    {
      value: "Freedom 250",
      href: '#'
    },
    
  ],
  logoSrc: "./assets/images/cbp-seal.svg"
};
ExternalFooter.storyName = 'External';