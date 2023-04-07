class Expand {
  constructor(expand) {
    this.expand = expand;
    this.title = this.expand.querySelector('.cbp-expand__title > span');
    this.button = this.expand.querySelector('button');
    this.expandContent = this.expand.querySelector('.cbp-expand__content');

    this.setAriaAttributes();
    
    this.button.addEventListener('click', () => {
      this.expand.classList.toggle('active');
      this.setAriaExpanded(this.expand);
    });

    this.title.addEventListener('click', () => {
      this.button.click();
      this.button.focus();
    })
  }

  generateId(ariaName) {
    return `${ariaName}-${Math.random().toString(36).substring(2,7)}`;
  }
  
  setAriaExpanded(expand) {
    if (!expand.classList.contains('active')) {
      this.button.setAttribute('aria-expanded', 'false');
    } else {
      this.button.setAttribute('aria-expanded', 'true');
    }
  }

  setAriaAttributes() {
    const ariaLabelledById = this.generateId('aria-expand');
    const ariaControlsId = this.generateId('expand-content');

    this.button.setAttribute('aria-expanded', 'false')

    this.button.setAttribute('aria-controls', ariaControlsId);
    this.expandContent.setAttribute('id', ariaControlsId);

    this.button.setAttribute('aria-labelledby', ariaLabelledById);
    this.title.setAttribute('id', ariaLabelledById);
  }
}

export default Expand;
