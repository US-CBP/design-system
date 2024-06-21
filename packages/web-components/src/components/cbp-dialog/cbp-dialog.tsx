import { Component, Prop, Element, Method, Event, EventEmitter, Watch, Host, h } from '@stencil/core';
import { setCSSProps, getFocusableElements } from '../../utils/utils';
//import state from './store';

@Component({
  tag: 'cbp-dialog',
  styleUrl: 'cbp-dialog.scss',
})
export class CbpDialog {
  private dialog: HTMLElement;
  private focusableElements: any[];

  @Element() host: HTMLElement;

  /** When set, specifies that the dialog is open */
  @Prop({ reflect: true }) open: boolean;

  /** Specifies a unique `ID` for the dialog, used to wire up the controls and accessibility features. */
  @Prop() uid: string;

  /** Creates an accessible label for the dialog. */
  @Prop() accessibilityText: string;

  /** Optionally specifies a card color (different from the default color) based on predefined design token values. */
  @Prop({ reflect: true }) color: 'info' | 'success' | 'warning' | 'danger';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Custom event fired when the dialog is opened. */
  @Event() dialogOpen!: EventEmitter;
  /** Custom event fired when the dialog is closed. */
  @Event() dialogClose!: EventEmitter;

  @Watch('open')
  watchOpenHandler(newValue: boolean) {
    newValue == true ? this.setFocus() : this.closeDialog();
  }

  /** A public method for opening the dialog. */
  @Method()
  async openDialog() {
    this.open = true;
    this.dialogOpen.emit({
      host: this.host,
      open: this.open,
    });
  }

  /** A public method for closing the dialog. */
  @Method()
  async closeDialog() {
    this.open = false;
    this.dialogClose.emit({
      host: this.host,
      open: this.open,
    });
  }

  setFocus() {
    setTimeout(() => {
      if (!this.focusableElements) {
        this.focusableElements = getFocusableElements(this.host);
      }
      this.focusableElements[0]?.focus();
    }, 100);
  }

  handleBackdropClick({ target }) {
    if (!target.closest('[role=dialog]')) {
      return;
    }
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
    // Adding/removing a class to support animation
    setTimeout(() => {
      this.open ? this.dialog.classList.add('cbp-dialog--open') : this.dialog.classList.remove('cbp-dialog--open');
    }, 10);
  }

  render() {
    return (
      <Host onClick={e => this.handleBackdropClick(e)} onKeyDown={() => {}} id={this.uid}>
        <div role="dialog" aria-modal="true" aria-label={this.accessibilityText} tabindex="-1" ref={el => (this.dialog = el)}>
          <div class="cbp-dialog-body">
            {[
              {
                node: <slot name="cbp-dialog-header" />,
                query: 'cbp-dialog-header',
              },
              {
                node: <slot name="cbp-dialog-body" />,
                query: 'cbp-dialog-body',
              },
            ].map(({ query, node }) => {
              const hasSlot = this.host.querySelector(`[slot=${query}]`);
              if (hasSlot) {
                return node;
              }
            })}
            <slot />
          </div>
          {this.host.querySelector(`[slot=cbp-dialog-actions]`) && (
            <div class="cbp-dialog-actions">
              <slot name="cbp-dialog-actions" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
