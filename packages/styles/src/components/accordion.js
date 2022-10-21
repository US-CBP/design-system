class Accordion {
  constructor(domNode) {
    this.accordionNode = domNode;

    this.accordionNode.addEventListener('click', this.toggle)
  }

  toggle(event) {
    const wrapper = event.target.closest('.cbp-accordion__item');
    wrapper.classList.toggle('active');
  }
}

export default Accordion;