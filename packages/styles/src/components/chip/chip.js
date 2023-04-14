class Chip {
  constructor(chip) {
    this.chip = chip;

    this.chip.addEventListener('click', (e) => {
      this.handleClick(e);
    });
  }

  handleClick(e) {
    // In case of nested elements, get the button they belong to (closest() is self-referencing)
    const clickedButton = e.target.closest('button');

    const previousState =
      clickedButton.hasAttribute('aria-pressed') &&
      clickedButton.getAttribute('aria-pressed') === 'true'
        ? true
        : false;

    // Toggle active class
    clickedButton.setAttribute('aria-pressed', (!previousState).toString());

    // Emit a custom event so that the developer can listen to the group rather than individual buttons
    const toggleEvent = new CustomEvent('chipToggle', {
      detail: {
        chip: this.chip,
        label: this.chip.innerText,
        value: this.chip.value,
        active: !previousState,
        nativeEvent: e,
      },
    });
    this.chip.dispatchEvent(toggleEvent);
  }
}

export default Chip;
