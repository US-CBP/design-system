class Banner {
  infoClassName = 'cbp-banner__info';
  securityClassName = 'cbp-banner__security';

  constructor(component) {
    this.banner = component;
    this.dismiss = component.querySelector('button');
    this.toggleControl = component.querySelector('.cbp-banner__toggle');
    this.content = component.querySelector('.cbp-banner__content');

    if (this.toggleControl) {
      this.toggleControl.setAttribute('aria-expanded', 'false');
    }

    this.dismiss.addEventListener('click', () => {
      if (
        this.banner.classList.contains(this.infoClassName) ||
        this.banner.classList.contains(this.securityClassName)
      ) {
        this.banner.setAttribute('hidden','');
      } else {
        this.toggle(this.content);
      }
    });
  }

  toggle(content) {
    content.classList.toggle('banner-active');

    if (this.toggleControl.getAttribute('aria-expanded') === 'true') {
      this.toggleControl.setAttribute('aria-expanded', 'false');
    } else {
      this.toggleControl.setAttribute('aria-expanded', 'true');
    }
  }
}

export default Banner;
