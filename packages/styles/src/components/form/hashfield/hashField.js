class HashField {
  constructor(component) {
    this.className = ".cbp-form__password";
    this.input = component.querySelector("input[type='password']");
    this.btn = component.querySelector("button[type='button']");

    this.addListener(this.btn, this.input);
  }

  addListener(btn, input) {
    btn.addEventListener("click", (e) => {
      if (input.type === "password") {
        input.type = "text";
        btn.firstElementChild.className = "fas fa-eye";
      } else {
        input.type = "password";
        btn.firstElementChild.className = "fas fa-eye-slash";
      }
    });
  }
}

export default HashField;