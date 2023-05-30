class Accordion {
  constructor(accordionItem) {
    this.accordionNode = accordionItem;
    this.accordionTrigger = this.accordionNode.querySelector('.cbp-accordion__trigger');
    this.accordionContent = this.accordionNode.querySelector('.cbp-accordion__content');

    this.accordionTrigger.setAttribute('aria-expanded', false)

    this.accordionNode.addEventListener('click', () => {
      this.toggle()
    });
  }

  toggle() {
    const previousState =
      this.accordionTrigger.hasAttribute('aria-expanded') &&
      this.accordionTrigger.getAttribute('aria-expanded') === 'true'
        ? true
        : false;
    
    this.accordionTrigger.setAttribute('aria-expanded', !previousState);
    this.accordionContent.toggleAttribute('hidden');
  }
}

export default Accordion;
