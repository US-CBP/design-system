export default {
  title: 'Patterns/Footer',
};

const Template = () => {
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
          <p class="cbp-footer__supplement">This application is maintained by The Office of Information Technology: TASPD.</p>
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
            <p>This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO). </p>
            <a href="#"><i class="fas fa-external-link-alt"></i>&nbsp;Learn More About InfoSec</a>    
          </div>
        </div>
        <p>This page contains information, in whole or part, that is marked FOR OFFFICIAL USE ONLY (FOUO). </p>
        <a href="#"><i class="fas fa-external-link-alt"></i>&nbsp;Learn More About InfoSec</a>
      </div>
    </footer>
  `;
};

export const Footer = Template.bind({});
Footer.args = {};
