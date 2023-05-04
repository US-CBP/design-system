class ObfuscatedField {
  constructor(component) {
    this.input = component;
    this.btn = component.nextElementSibling;
     
    if (this.btn) {
      this.btn.setAttribute('aria-pressed', false)
    }

    this.addListener(this.btn, this.input);
  }

  addListener(btn, input) {
    btn.addEventListener("click", (e) => {
      if (input.type === "password") {
        input.type = "text";
        btn.setAttribute('aria-pressed', true)
        btn.firstElementChild.className = "fas fa-eye";
      } else {
        input.type = "password";
        btn.setAttribute('aria-pressed', false)
        btn.firstElementChild.className = "fas fa-eye-slash";
      }
    });
  }
}

export default ObfuscatedField;