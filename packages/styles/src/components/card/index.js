class LinkCard {
  constructor(component) {
    this.card = component;
    this.title = component.querySelector('.cbp-card__title');
    this.titleLink = this.title.querySelector('a[href]');
    this.clickableElements = Array.from(this.card.querySelectorAll('a[href]'));

    this.clickableElements.forEach(element => {
      element.addEventListener('click', (e) => e.stopPropagation())
    })

    this.card.addEventListener('click', () => this.handleClick(this.titleLink))
  }

  handleClick(link) {
    const noTextSelected = !window.getSelection().toString();

    if (noTextSelected) {
      link.click();
      link.focus(); 
    }
  }
}

export default LinkCard;