class Banner {
  infoClassName = 'cbp-banner__info';
  securityClassName = 'cbp-banner__security';
  
  constructor(component) {
    this.banner = component;
    this.dismiss = component.querySelector('button');
    this.content = component.querySelector('.cbp-banner__content');

    this.dismiss.addEventListener('click', () => {
      if (this.banner.classList.contains(this.infoClassName) || this.banner.classList.contains(this.securityClassName)) {
        this.banner.remove();
      } else {
        this.toggle(this.content)
      }
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