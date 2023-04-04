class ApplicationHeader {
    constructor (appHeader) {
      this.appHeader = appHeader;
      this.bootstrapNavControls()
    }
  
    bootstrapNavControls() {
      const controls = document.querySelectorAll('nav.cbp-application-header button.cbp-menu-dropdown');
      Array.from(controls).forEach( (el) => {
        // add aria-controls to each button
        if('controls' in el.dataset) {
          el.setAttribute('aria-controls', el.dataset.controls);
        }
        
        el.addEventListener('click', (event) => {
          const target = document.querySelector('#'+el.dataset.target);
          if ('target' in el.dataset) {
            if (target){
              target.click();
              //event.preventDefault();
            }
            else {
              console.warn('Application Header: Button target not found referencing the drawer control.');
            }
          }
        });
      });
    }
  }
  
  export default ApplicationHeader;