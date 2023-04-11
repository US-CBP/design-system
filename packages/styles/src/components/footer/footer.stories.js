export default {
  title: 'Patterns/Footer',
  parameters: {
    layout: 'fullscreen'
  }
};

const InternalTemplate = () => {
  return `
    <footer class="cbp-footer">
      <ul class="cbp-footer__links">
        <li><a href="#">App Overview</a></li>
        <li><a href="#">Trainings</a></li>
        <li><a href="#">FAQ's</a></li>
        <li><a href="#">Release Notes</a></li>
      </ul>
      <div class="cbp-footer__info">
        <div>
          <h6><i class="fas fa-headset"></i> Application Support</h6>
          <p class="cbp-font-italic">This application is maintained by The Office of Information Technology: TASPD.</p>
          <ul class="cbp-contact-list">
            <li>Having an issue?</li>
            <li><span>Email:</span>&nbsp;<a href="#">application-support@cbp.dhs.gov</a></li>
            <li><span>CBP Helpdesk:</span>&nbsp;(555) 555-5555</li>
          </ul>
        </div>
        <div class="cbp-footer__sec">
          <img src="../assets/images/cbp-icon/SECURITY ICON - LES FOUO.svg" alt="security icon">
          <div>
            <h6>Infosec Classification: FOUO</h6>
            <p>This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO).</p>
            <a href="#"><i class="fas fa-external-link-alt"></i>&nbsp;Learn More About InfoSec</a>
          </div>
        </div>
        <p class="cbp-margin-top-3x">This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO).</p>
        <a href="#"><i class="fas fa-external-link-alt"></i>&nbsp;Learn More About InfoSec</a>
      </div>
    </footer>
  `;
};

const ExternalTemplate = () => {
  return `
    <footer class="cbp-footer-external">
      <div>
        <p>Contact CBP</p>
        <ul class="cbp-footer__social-links">
          <li><a href="#"><i class="fab fa-twitter"></i></a></li>
          <li><a href="#"><i class="fab fa-facebook"></i></a></li>
          <li><a href="#"><i class="fab fa-youtube"></i></a></li>
          <li><a href="#"><i class="fab fa-flickr"></i></a></li>
          <li><a href="#"><i class="fab fa-instagram"></i></a></li>
          <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
          <li><a href="#"><i class="fas fa-envelope"></i></a></li>
        </ul>
      </div>
      <div class="cbp-footer__info">
        <div>
          <div class="cbp-footer__seal">
            <img src="assets/images/DHS_SEAL.svg" alt="U.S. Department of Homeland Security" height="44" width="44" />
            <span>CBP.gov</span>
          </div>
          <p>An official website of the <br><a href="https://www.dhs.gov/" class="cbp-font-italic"><i class="fas fa-external-link-alt"></i>U.S. Department of Homeland Security</a></p>
        </div>
        <ul class="cbp-footer__external-links">
          <li><a href="#"><i class="fas fa-arrow-right"></i>Accessibility</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>Accountability</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>DHS Components</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>FOIA</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>Forms</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>Inspector General</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>No FEAR Act</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>Privacy</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>Site Policies</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>The White House</a></li>
          <li><a href="#"><i class="fas fa-arrow-right"></i>USA.gov</a></li>
        </ul>
        <div class="cbp-footer__ntas">
          <img src="assets/images/NTAS_LOGO.svg" alt="National Terrorism Advisory System" height="84" width="200" />
          <a href="#"><i class="fas fa-external-link-alt"></i>Learn More</a>
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