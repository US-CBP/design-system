export default {
  title: 'Components/Footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    footerNav: {
      name: 'Footer Navigation',
      description: 'Configure various aspects of the footer navigation shown.',
      control: 'object',
    },
  },
};

function generateFooterNav(footerNav) {
  const html = footerNav.map(({ label, href }) => {
    return `
      <cbp-flex-item role="list-item">  
        <cbp-button tag="a" href=${href}>${label}</cbp-button>
      </cbp-flex-item>
    `;
  });
  return html.join('');
}

const InternalTemplate = ({ footerNav }) => {
  return `
    <cbp-footer data-cbp-container-context="dark">
      <nav slot="cbp-footer-nav">
        <cbp-flex role="list" breakpoint="37.5rem">
          ${generateFooterNav(footerNav)}
        <cbp-flex role="list">
      </nav>

      <section>
        <cbp-typography tag="h6" variant="heading-md" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>Application Support</cbp-typography>
        <p><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></p>
        <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
          <span>Having an issue?</span>
          <span>Email: <cbp-link href="mailto:somebody@example.com">this-application-support@abc.def.gov</cbp-link></span>
          <span>CBP Helpdesk: <cbp-link href="tel:555-555-5555">(555) 555-5555</cbp-link></span>
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
};

InternalFooter.storyName = 'Internal';
