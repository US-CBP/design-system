class HashedField {
  constructor(component) {
    this.input = component;
    this.btn = component.querySelector("input[type='password'] + button[type='button']");

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

export default HashedField;