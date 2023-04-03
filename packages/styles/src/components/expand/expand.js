class Expand {
  constructor(component) {
    this.expand = component;
    this.title = component.querySelector('.cbp-expand__title');
    this.button = component.querySelector('button');

    this.title.addEventListener('click', () => {
      this.expand.classList.toggle('active');
      this.button.focus();
    });
  }
}

export default Expand;
