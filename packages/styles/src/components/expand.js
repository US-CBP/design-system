class Expand {
  constructor(component) {
    this.expand = component;
    this.title = component.querySelector('.cbp-expand__title');
    this.activeClass = 'active';
    
    this.addListener('click');
  }

  addListener(type) {
    this.title.addEventListener(type, e => {
      this.expand.classList.toggle(this.activeClass);
    });
  }
}

export default Expand;