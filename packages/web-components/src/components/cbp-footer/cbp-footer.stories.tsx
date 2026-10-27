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
    <li style="margin-bottom: var(--cbp-space-3x);">
      <cbp-link href="${generateLink(href)}" >
        <cbp-icon name="arrow-right"></cbp-icon>
        ${value}
      </cbp-link>
    </li>
    `;
  });
  return html.join('');
}

const InternalTemplate = ({ footerNav, logoSrc }) => {
  return `
    <cbp-footer 
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

export const InternalFooter: any = InternalTemplate.bind({});
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
  logoSrc: "./assets/images/dhs-seal.svg"
};
InternalFooter.storyName = 'Internal';

const ExternalTemplate = ({ footerNav, linkList, logoSrc}) => {

  setTimeout(() => {
      document.getElementById("externalFooterList").removeAttribute("role")
    }, 100);

   return `
    <cbp-footer 
      ${logoSrc ? `logo-src=${logoSrc}` : ''}
      >
      <nav slot="cbp-footer-nav" aria-label="Footer Navigation">
        <cbp-flex role="list">
          ${generateFooterNav(footerNav)}
        </cbp-flex>
      </nav>

      <cbp-flex
        breakpoint="27rem"
      >
        <cbp-flex-item flex-grow=1>
          <cbp-multicol 
            columns="3" 
            width="16rem" 
            gap="var(--cbp-space-8x)" 
            sx='{
              "list-style":"none"
            }' 
            role="list">
            ${generateLinkListItem(linkList)}
          </cbp-multicol>
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
            context="dark-always"
          >
            <cbp-icon name="arrow-right"></cbp-icon>
            Learn More
          </cbp-button>
        </cbp-flex>
      </cbp-flex>
    </cbp-footer>
  `;
};
export const ExternalFooter: any = ExternalTemplate.bind({});
ExternalFooter.args = {
  footerNav: [ 
    {
      label: '<cbp-icon name="facebook" accessibility-text="CBP facebook"></cbp-icon>',
      href: 'https://www.facebook.com/CBPgov',
    },
    {
      label: '<cbp-icon name="x-twitter" accessibility-text="CBP X"></cbp-icon>',
      href: 'https://x.com/cbp',
    },
    {
      label: '<cbp-icon name="youtube" accessibility-text="CBP youtube"></cbp-icon>',
      href: 'https://www.youtube.com/channel/UCVRj-aUsXBrlM8elk3zmLvw',
    },
    {
      label: '<cbp-icon name="instagram" accessibility-text="CBP instagram"></cbp-icon>',
      href: 'https://www.instagram.com/cbpgov',
    },
  ],
  linkList: [
    {
      value: "About CBP",
      href: 'https://www.cbp.gov/about'
    },
    {
      value: "Section 508 Accessibility",
      href: 'https://www.cbp.gov/site-policy-notices/accessibility'
    },
    {
      value: "Accountability",
      href: 'https://www.cbp.gov/newsroom/accountability-and-transparency'
    },
    {
      value: "DHS Components",
      href: 'https://www.dhs.gov/operational-and-support-components'
    },
    {
      value: "Forms",
      href: 'https://www.cbp.gov/newsroom/publications/forms'
    },
    {
      value: "Freedom of Information Act (FOIA)",
      href: 'https://www.cbp.gov/site-policy-notices/foia'
    },
    {
      value: "Inspector General",
      href: 'https://www.oig.dhs.gov/'
    },
    {
      value: "No FEAR Act",
      href: 'https://www.cbp.gov/about/eeo/no-fear-act'
    },
    {
      value: "Vulnerability Disclosure Program",
      href: 'https://www.cbp.gov/document/directives/vulnerability-disclosure-program-policy-and-rules-engagement'
    },
    {
      value: "Privacy",
      href: 'https://www.cbp.gov/site-policy-notices/privacy-policy'
    },
    {
      value: "Contact Us",
      href: 'https://www.cbp.gov/about/contact'
    },
    {
      value: "Site Policies",
      href: 'https://www.cbp.gov/site-policy-notices'
    },
    {
      value: "The White House",
      href: 'https://www.whitehouse.gov/'
    },
    {
      value: "USA.gov",
      href: 'https://www.usa.gov/'
    },
    {
      value: "Freedom 250",
      href: 'https://www.cbp.gov/250'
    },
    
  ],
  logoSrc: "./assets/images/dhs-seal.svg"
};
ExternalFooter.storyName = 'External';