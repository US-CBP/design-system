class Toggle {
  constructor(node) {
    this.node = node; // Toggle wrapper
    this.checkbox = node.querySelector('input[type="checkbox"]'); // Toggle checkbox
    this.slider = this.checkbox.nextElementSibling; // Slider (span) element should always be adjacent to checkbox input
    this.leftIcon = this.slider.firstElementChild;
    this.rightIcon = this.slider.lastElementChild;

    this.node.addEventListener("change", (e) => {
      this.toggleIcons(e);
    });
  }

  isChecked(event = null) {
    if (event) {
      return event.target.checked;
    } else {
      return this.checkbox.checked;
    }
  }

  isCheckbox(event) {
    return event.target.type === "checkbox";
  }

  containsIcons() {
    return this.slider.children.length > 0;
  }

  toggleIcons(event) {
    if (!this.containsIcons()) {
      return;
    } else {
      if (this.isChecked(event)) {
        this.leftIcon.style.display = "inline-block";
        this.rightIcon.style.display = "none";
      } else {
        this.leftIcon.style.display = "none";
        this.rightIcon.style.display = "inline-block";
      }
    }
  }
}

export default Toggle;
