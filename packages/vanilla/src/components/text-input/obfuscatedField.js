class ObfuscatedField {
  constructor(component) {
    this.input = component;
    this.btn = component.nextElementSibling.querySelector('button');

    if (this.btn) {
      this.btn.setAttribute('aria-pressed', false);
      this.btn.setAttribute('aria-label', 'show entry');
    }

    this.addListener(this.btn, this.input);
  }

  addListener(btn, input) {
    btn.addEventListener('click', (e) => {
      if (input.type === 'password') {
        input.type = 'text';
        btn.setAttribute('aria-pressed', true);
        btn.setAttribute('aria-label', 'hide entry');
        btn.firstElementChild.className = 'fas fa-eye';
      } else {
        input.type = 'password';
        btn.setAttribute('aria-pressed', false);
        btn.setAttribute('aria-label', 'show entry');
        btn.firstElementChild.className = 'fas fa-eye-slash';
      }
    });
  }
}

export default ObfuscatedField;
