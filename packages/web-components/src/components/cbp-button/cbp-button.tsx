import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';
//import state from './store';

/**
 * @slot - The button's label, which may contain markup such as icons, is placed in the default slot.
 */
@Component({
  tag: 'cbp-button',
  styleUrl: 'cbp-button.scss',
})
export class CbpButton {
  private button: any; // HTMLButtonElement or HTMLAnchorElement
  private controlTarget: any;

  @Element() host: HTMLElement;

  /** Specifies whether the button is a true button element or "link button." */
  @Prop() tag: 'button' | 'a' = 'button';
  /** The `type` attribute of the button: button, submit, or reset. Defaults to "button." */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  /** The visual fill of the button: solid, outline, or ghost. Defaults to "solid." */
  @Prop({ reflect: true }) fill: 'solid' | 'outline' | 'ghost' = 'solid';
  /** The color of the button: primary, secondary, or danger. Defaults to "primary." */
  @Prop({ reflect: true }) color: 'primary' | 'secondary' | 'danger' = 'primary';
  /** Specifies a variant of the buttons, such as square for buttons with only an icon and call-to-action button. */
  @Prop({ reflect: true }) variant: 'square' | 'cta';
  /** The `value` attribute of the button, which is passed as part of formData for the the pressed submit button. */
  @Prop() value: string;

  /** The `href` attribute of a link button. */
  @Prop() href: string;
  /** The `rel` attribute of a link button. */
  @Prop() rel: string;
  /** The `target` attribute of a link button. */
  @Prop() target: string;
  /** The `download` attribute of a link button; when present tells the browser to download the specified href URI instead
   * of viewing or navigating to it.
   */
  @Prop() download: boolean;

  /** Specifies the (min-)width of the button (in CSS units) when different from the default size. */
  @Prop() width: string;
  /** Specifies the (min-)height of the button (in CSS units) when different from the default size. */
  @Prop() height: string;

  /** Specifies if the button is pressed and results in `aria-pressed="true"` being placed on the button when true. Only valid on actual `button` elements. */
  @Prop() pressed: boolean;
  /** Specifies if a controlled UI widget is expanded and results in `aria-pressed="true"` being placed on the button when true.
   * This property is usually used for progressive disclosure patterns such as accordions, menus, expand/collapse, etc., where
   * focus remains on the control after the user action.
   */
  @Prop() expanded: boolean;
  /** Specifies the DOM element that the button controls and results in the `aria-controls` attribute
   * rendered on the button with the specified value.
   */
  @Prop() controls: string;
  /* ??? */
  //@Prop() controlProp: "pressed" | "expanded";
  /** The property on the target element being toggled by the button/control. */
  @Prop() targetProp: string; // A prop on the controlled element such as "open"

  /** Specifies an accessible label for the button/link as an `aria-label` when the button does not contain label text
   * or a sufficiently unique label. This text overrides the default label and is not additive to it.
   */
  @Prop() accessibilityText: string;

  /** Internal use: Specifies that a button should not be keyboard navigable by setting its tabindex to -1. This property should only be used in very specific cases. */
  @Prop() pointerOnly: boolean;

  /** Marks the rendered button/link in a disabled state when specified. */
  @Prop() disabled: boolean;
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() buttonClick!: EventEmitter;
  /** A custom event emitted when the component has completed loading and its internal lifecycles. */
  @Event() componentLoad!: EventEmitter;

  handleClick() {
    // If this is a control for something, manage state through stencil store
    if (this.controls) {
      // If the controlled element wasn't found, try to find it again
      if (!this.controlTarget) {
        this.controlTarget = this.controls ? document.querySelector(`#${this.controls}`) : undefined;
      }
      if (this.controlTarget) {
        this.controlTarget[this.targetProp] = !this.controlTarget[this.targetProp];
      } else {
        console.warn('cbp-button configuration error: the control target referenced by ID by the `control` property could not be found.');
      }
    }

    this.buttonClick.emit({
      host: this.host,
      nativeElement: this.button,
      controls: this.controls ? this.controls : null,
      pressed: this.pressed,
      expanded: this.expanded,
      value: this.button.tagName == 'button' ? this.button.value : null,
    });
  }

  componentWillLoad() {
    this.controlTarget = this.controls ? document.querySelector(`#${this.controls}`) : undefined;

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    setCSSProps(this.button, {
      'min-width': this.width,
      'min-height': this.height
    });

    this.componentLoad.emit({
      host: this.host,
      nativeElement: this.button,
      value: this.button.tagName == 'button' ? this.button.value : null,
    });
  }

  render() {
    const { type, value, pressed, expanded, controls, disabled, rel, target, href, download } = this;

    const attrs =
      this.tag === 'button'
        ? {
            type,
            value,
            controls,
            disabled,
          }
        : {
            controls,
            download,
            href,
            rel,
            target,
          };

    if (this.tag === 'button') {
      return (
        <Host>
          <button
            {...attrs}
            tabindex={this.pointerOnly || this.disabled ? -1 : 0}
            aria-label={this.accessibilityText}
            aria-pressed={pressed ? 'true' : null}
            aria-expanded={expanded ? 'true' : null}
            aria-controls={this.controls}
            onClick={() => this.handleClick()}
            ref={el => (this.button = el)}
          >
            <slot />
          </button>
        </Host>
      );
    } 
    else {
      return (
        <Host>
          <a
            {...attrs}
            tabindex={this.pointerOnly || this.disabled ? -1 : 0}
            aria-label={this.accessibilityText}
            aria-pressed={pressed ? 'true' : null}
            aria-expanded={expanded ? 'true' : null}
            aria-controls={this.controls}
            role={disabled ? 'link' : null}
            aria-disabled={disabled ? 'true' : null}
            onClick={() => this.handleClick()}
            ref={el => (this.button = el)}
          >
            <slot />
          </a>
        </Host>
      );
    }
  }
}
