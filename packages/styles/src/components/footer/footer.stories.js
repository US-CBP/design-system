export default {
  title: 'Patterns/Footer',
  parameters: {
    layout: 'fullscreen'
  }
};

const InternalTemplate = () => {
  return `
    <footer class="cbp-footer">
      <nav>
        <ul>
          <li><a href="#">App Overview</a></li>
          <li><a href="#">Trainings</a></li>
          <li><a href="#">FAQ's</a></li>
          <li><a href="#">Release Notes</a></li>
        </ul>
      </nav>
      <div class="cbp-footer__info">
        <section class="cbp-footer__support">
          <h6 class="cbp-footer__heading"><i class="fas fa-headset"></i> Application Support</h6>
          <p class="cbp-footer__text">This application is maintained by The Office of Information Technology: TASPD.</p>
          <ul>
            <li>Having an issue?</li>
            <li><span>Email:</span>&nbsp;<a href="#">application-support@cbp.dhs.gov</a></li>
            <li><span>CBP Helpdesk:</span>&nbsp;(555) 555-5555</li>
          </ul>
        </section>
        <div class="cbp-footer__security">
          <div>
            <img src="../assets/images/cbp-icon/SECURITY ICON - LES FOUO.svg" alt="security icon">
            <div>
              <h6 class="cbp-footer__heading">Infosec Classification: FOUO</h6>
              <p class="cbp-footer__text">This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO). <a href="#"><i class="fas fa-external-link-alt"></i>Learn More About InfoSec</a></p>
            </div>
          </div>
          <p class="cbp-footer__text">This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO). <a href="#"><i class="fas fa-external-link-alt"></i>Learn More About InfoSec</a></p>
        </div>
      </div>
    </footer>
  `;
};

const ExternalTemplate = () => {
  return `
    <footer class="cbp-external-footer">
      <section>
        <h6 class="cbp-footer__heading">Contact CBP</h6>
        <ul class="cbp-external-footer__social">
          <li><a target="_blank" rel="noopener noreferrer" href="https://facebook.com/CBPgov"><i class="fab fa-facebook"></i></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/CBP"><i class="fab fa-twitter"></i></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@customsborderprotect"><i class="fab fa-youtube"></i></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.flickr.com/people/cbpphotos/"><i class="fab fa-flickr"></i></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/CBPgov"><i class="fab fa-instagram"></i></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/customs-and-border-protection"><i class="fab fa-linkedin"></i></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://public.govdelivery.com/accounts/USDHSCBP/subscriber/new"><i class="fas fa-envelope"></i></a></li>
        </ul>
      </section>
      <div class="cbp-footer__info">
        <div>
          <div class="cbp-external-footer__seal">
            <img src="assets/images/DHS_SEAL.svg" alt="U.S. Department of Homeland Security" height="44" width="44" />
            <span>CBP.gov</span>
          </div>
          <p class="cbp-footer__text">An official website of the <br><a href="https://www.dhs.gov/" class="cbp-font-italic"><i class="fas fa-external-link-alt"></i>U.S. Department of Homeland Security</a></p>
        </div>
        <ul class="cbp-external-footer__links">
          <li><a href="https://www.cbp.gov/contact"><i class="fas fa-arrow-right"></i>CBP Contact Information</a></li>
          <li><a href="https://www.cbp.gov/site-policy-notices/accessibility"><i class="fas fa-arrow-right"></i>Accessibility</a></li>
          <li><a href="https://www.cbp.gov/newsroom/publications/performance-accountability-financial"><i class="fas fa-arrow-right"></i>Accountability</a></li>
          <li><a href="https://www.dhs.gov/operational-and-support-components"><i class="fas fa-arrow-right"></i>DHS Components</a></li>
          <li><a href="https://www.cbp.gov/site-policy-notices/foia"><i class="fas fa-arrow-right"></i>FOIA</a></li>
          <li><a href="https://www.cbp.gov/newsroom/publications/forms"><i class="fas fa-arrow-right"></i>Forms</a></li>
          <li><a href="https://www.oig.dhs.gov/"><i class="fas fa-arrow-right"></i>Inspector General</a></li>
          <li><a href="https://www.cbp.gov/about/eeo-diversity/no-fear-act"><i class="fas fa-arrow-right"></i>No FEAR Act</a></li>
          <li><a href="https://www.cbp.gov/site-policy-notices/privacy-policy"><i class="fas fa-arrow-right"></i>Privacy</a></li>
          <li><a href="https://www.cbp.gov/site-policy-notices"><i class="fas fa-arrow-right"></i>Site Policies</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.whitehouse.gov/"><i class="fas fa-external-link-alt"></i>The White House</a></li>
          <li><a href="https://www.cbp.gov/document/directives/vulnerability-disclosure-program-policy-and-rules-engagement"><i class="fas fa-arrow-right"></i>Vulnerability Disclosure Program</a></li>
          <li><a href="https://www.usa.gov/"><i class="fas fa-external-link-alt"></i></i>USA.gov</a></li>
        </ul>
        <div class="cbp-external-footer__ntas">
          <img src="assets/images/NTAS_LOGO.svg" alt="National Terrorism Advisory System" height="84" width="200" />
          <a href="https://www.dhs.gov/ntas/advisory/national-terrorism-advisory-system-bulletin-november-30-2022"><i class="fas fa-external-link-alt"></i>Learn More</a>
        </div>
      </div>
    </footer>
  `;
};

export const InternalFooter = InternalTemplate.bind({});
InternalFooter.args = {};
InternalFooter.storyName = 'Internal';

export const ExternalFooter = ExternalTemplate.bind({});
ExternalFooter.args = {};
ExternalFooter.storyName = 'External';