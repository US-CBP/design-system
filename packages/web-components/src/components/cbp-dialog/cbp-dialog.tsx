import { Component, Prop, Element, Method, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps, getFocusableElements } from '../../utils/utils';
//import state from './store';

@Component({
  tag: 'cbp-dialog',
  styleUrl: 'cbp-dialog.scss'
})
export class CbpDialog {

  private dialog: HTMLElement;
  private focusableElements: any[];


  @Element() host: HTMLElement;

/*
    this.dialogUpdate = createEvent(this, "dialogUpdate", 7);
    this.width = undefined;
    this.height = undefined;
    this.open = undefined;
    this.closeButton = undefined;
    this.backdrop = undefined;
    this.actionRequired = undefined;
    this.accessibilityText = undefined;
    this.breakpoint = undefined;
*/

/** When set, specifies that the dialog is open */
  @Prop({ reflect: true }) open: boolean;
  
  /** Specifies a unique `ID` for the dialog, used to wire up the controls and accessibility features. */
  @Prop() uid: string;
  
  /** Creates an accessible label for the dialog. */
  @Prop() accessibilityText: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  /*
  escKeyHandler({ key }) {
    if (!this.actionRequired && key == "Escape") {
      this.open = false;
    }
  }
  openHandler(open) {
    this.dialogUpdate.emit({
      host: this.host, open: open
    });
  }
  setFocusElement() {
    var _a, _b;
    if (!this.open && this.trigger) {
      (_a = this.trigger) === null || _a === void 0 ? void 0 : _a.focus();
    }
    else {
      (_b = this.dialog) === null || _b === void 0 ? void 0 : _b.focus();
    }
  }
  async doOpen() {
    this.open = true;
  }
  async doClose() {
    this.open = false;
  }

  componentDidUpdate() {
    this.setFocusElement();
  }

  */


  /** Custom event fired when the drawer is opened. */
  @Event() dialogOpen!: EventEmitter;
  /** Custom event fired when the drawer is closed. */
  @Event() dialogClose!: EventEmitter;


  @Watch('open') 
  watchOpenHandler(newValue: boolean) {
    newValue==true ? this.setFocus() : this.closeDialog();
  }

  /** A public method for opening the drawer. */
  @Method()
  async openDialog() {
    this.open=true;
    this.dialogOpen.emit({
      host: this.host,
      open: this.open,
    });
  }

  /** A public method for closing the drawer. */
  @Method()
  async closeDialog() {
    this.open=false;
    this.dialogClose.emit({
      host: this.host,
      open: this.open,
    });
  }

  setFocus() {
    setTimeout( () => {
      if (!this.focusableElements) {
        this.focusableElements=getFocusableElements(this.host);  
      }
      this.focusableElements[0]?.focus()
      //console.log(this.focusableElements,document.activeElement);
    },100);
  }


  handleBackdropClick({target}) {
    !target.closest('[role=dialog]') && this.closeDialog();
  }


  componentDidLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.dialog, {
      ...this.sx,
    });
    // If the dialog is open on initial load, set focus
    this.open && this.setFocus();
  }

  componentDidRender() {
    setTimeout(() => {
      (this.open) ?
      this.dialog.classList.add('cbp-dialog--open')
      : this.dialog.classList.remove('cbp-dialog--open');  
    }, 10);
    
  }

  render() {
    return (
      <Host
        onClick={(e) => this.handleBackdropClick(e)}
        onKeyDown={ () => {}}
        id={this.uid}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={this.accessibilityText}
          tabindex="-1"
          ref={(el) => this.dialog = el}
        >
          <div class="cbp-dialog-body">
            {
              [
                {
                  node: <slot name="cbp-dialog-header" />,
                  query: 'cbp-dialog-header',
                },
                {
                  node: <slot name="cbp-dialog-body" />,
                  query: 'cbp-dialog-body',
                }
              ].map(({ query, node }) => {
                const hasSlot = this.host.querySelector(`[slot=${query}]`);
                if (hasSlot) {
                  return (node);
                }
              })
            }
            <slot />
          </div>
          {
            this.host.querySelector(`[slot=cbp-dialog-actions]`) && 
              <div class="cbp-dialog-actions">
                <slot name="cbp-dialog-actions" />
              </div>
          }
        </div>
      </Host>
    );
  }

}
