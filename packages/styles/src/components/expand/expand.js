class Expand {
  constructor(expand) {
    this.expand = expand;
    this.title = this.expand.querySelector('.cbp-expand__title');
    this.button = this.expand.querySelector('button');
    this.expandContent = this.expand.querySelector('.cbp-expand__content');

    this.title.addEventListener('click', () => {
      this.expand.classList.toggle('active');
      this.setExpandAria(this.expand);
      this.button.focus();
    });
  }

  setExpandAria(expand) {
    if (!expand.classList.contains('active')) {
      this.button.setAttribute('aria-expanded', 'false');
      this.expandContent.setAttribute('aria-hidden', 'true');
    } else {
      this.button.setAttribute('aria-expanded', 'true');
      this.expandContent.setAttribute('aria-hidden', 'false');
    }
  }
}

export default Expand;
