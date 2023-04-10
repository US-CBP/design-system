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
        <p>This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO).</p>
        <a href="#"><i class="fas fa-external-link-alt"></i>&nbsp;Learn More About InfoSec</a>
      </div>
    </footer>
  `;
};

const ExternalTemplate = () => {
  return `
    <footer class="cbp-footer" data-footer="external">
      <div>
        <p>Contact CBP</p>
        <ul class="cbp-footer__social">
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
          <img src="assets/images/DHS_SEAL.svg" class="cbp-footer__seal" alt="U.S. Department of Homeland Security" height="44" width="44" />
          <span>CBP.gov</span>
          <p>An official website of the</p>
          <a href="https://www.dhs.gov/" class="cbp-font-italic"><i class="fas fa-external-link-alt"></i>&nbsp;U.S. Department of Homeland Security</a>
        </div>
        <div class="cbp-footer__sec">
          
        </div>
        <p>This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO). </p>
        <a href="#"><i class="fas fa-external-link-alt"></i>&nbsp;Learn More About InfoSec</a>
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