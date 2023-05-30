class Accordion {
  constructor(accordion) {
    this.accordionNode = accordion;
    this.accordionControl = this.accordionNode.querySelector('.cbp-accordion__control');
    this.accordionContent = this.accordionNode.querySelector('.cbp-accordion__content');

    this.accordionControl.setAttribute('aria-expanded', false)

    this.accordionNode.addEventListener('click', () => {
      this.toggle()
    });
  }

  toggle() {
    const previousState =
      this.accordionControl.hasAttribute('aria-expanded') &&
      this.accordionControl.getAttribute('aria-expanded') === 'true'
        ? true
        : false;
    
    this.accordionControl.setAttribute('aria-expanded', !previousState);
    this.accordionContent.toggleAttribute('hidden');
  }
}

export default Accordion;
