class IndeterminateCheckbox {
  constructor(checkbox) {
    this.indeterminateCheckbox = checkbox;
    this.nestedCheckboxWrapper = this.indeterminateCheckbox.closest('.cbp-checkbox-item').nextElementSibling;
    this.nestedCheckboxInputs = this.nestedCheckboxWrapper.querySelectorAll('input[type="checkbox"');

    this.indeterminateCheckbox.addEventListener('change', (e) => {
      e.target.checked
        ? this.nestedCheckboxInputs.forEach(
            (checkbox) => (checkbox.checked = true)
          )
        : this.nestedCheckboxInputs.forEach(
            (checkbox) => (checkbox.checked = false)
          );
    });

    this.nestedCheckboxInputs.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateDisplay();
      })
    })
  }

  updateDisplay() {
    let checkedCount = 0;

    for(const checkbox of this.nestedCheckboxInputs) {
      if (checkbox.checked) {
        checkedCount++;
      }
    }

    if(checkedCount === 0) {
      this.indeterminateCheckbox.checked = false;
      this.indeterminateCheckbox.indeterminate = false;
    } else if(checkedCount === this.nestedCheckboxInputs.length) {
      this.indeterminateCheckbox.checked = true;
      this.indeterminateCheckbox.indeterminate = false;
    } else {
      this.indeterminateCheckbox.checked = false;
      this.indeterminateCheckbox.indeterminate = true;
    }
  }
}

export default IndeterminateCheckbox;