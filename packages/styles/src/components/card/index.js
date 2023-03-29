export class LinkCard {
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

export class ControlCard {
  constructor(component) {
    this.card = component;
    this.isCheckbox = !!this.card.querySelector('input[type="checkbox"');
    this.input = this.card.querySelector('input');

    this.card.addEventListener('click', (e) => this.handleClick(e, this.isCheckbox))
  }

  handleClick(e, isCheckbox) {
    if (!isCheckbox) {
      this.input.checked = true;
      this.input.focus();
      return;
    }
  }
}
