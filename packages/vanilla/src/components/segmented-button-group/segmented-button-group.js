class SegmentedButtonGroup {
  constructor(segmentedButtonGroup) {
    this.segmentedButtonGroup = segmentedButtonGroup;
    this.buttons = this.segmentedButtonGroup.querySelectorAll('button');
    this.type="multi";

    // Default all buttons to aria-pressed='false' if not explicitly set
    Array.from(this.buttons).forEach(el => {
      if(!el.hasAttribute('aria-pressed') ){
          el.setAttribute('aria-pressed','false');
      }
    })

    // Get the type, if set
    if(this.segmentedButtonGroup.dataset.segmentedButtonType){
        this.type=this.segmentedButtonGroup.dataset.segmentedButtonType;
    }

    this.segmentedButtonGroup.addEventListener('click', (e) => {
      this.handleButtonClick(e);
    });
  }


  handleButtonClick(e) {
    // In case of nested elements, get the button they belong to (closest() is self-referencing)
    const clickedButton = e.target.closest('button');

    const previousState =
      clickedButton.hasAttribute('aria-pressed') &&
      clickedButton.getAttribute('aria-pressed') === 'true'
        ? true
        : false;
    
      // Toggle aria-pressed
      clickedButton.setAttribute('aria-pressed', (!previousState).toString());

      // handle type=single segmented buttons (toggle off all other buttons)
      if(this.type=="single") {
        Array.from(this.buttons).forEach(el => {
            if(!previousState && el !=clickedButton){
              el.setAttribute('aria-pressed','false');
            }
        });
      }

      // Emit a custom event so that the developer can listen to the group rather than individual buttons
      const toggleEvent = new CustomEvent("buttonToggle", { 
        detail: {
          button: clickedButton,
          value: clickedButton.value,
          pressed: !previousState,
          nativeEvent: e
        }
      });
      this.segmentedButtonGroup.dispatchEvent(toggleEvent);
  }

}

export default SegmentedButtonGroup;
