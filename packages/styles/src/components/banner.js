class Banner {
  infoClassName = 'cbp-banner__info';
  securityClassName = 'cbp-banner__security';
  
  constructor(component) {
    this.banner = component;
    this.dismiss = component.querySelector('button');
    this.content = component.querySelector('.cbp-banner__content');

    this.dismiss.addEventListener('click', () => {
      this.toggle(this.content)
    })
  }

  toggle(content) {
    content.classList.toggle('banner-active')
  }
}

/**
 * TODO: Combine code for accordion and USA banner since they have similar functionality. 
 */

export default Banner;