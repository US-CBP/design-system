import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps, getElementAttrs } from '../../utils/utils';
//import state from './store';

/**
 * @slot - The button's label, which may contain markup such as icons, is placed in the default slot.
 * @slot - cbp-button-custom - Custom buttons/anchors may be slotted via named-slot, which prevents the web component from rendering its own tag. In such a case, component properties that render attributes directly onto the rendered button will have no effect, as they are expected to be supplied directly on the slotted custom element.
 */
@Component({
  tag: 'cbp-button',
  styleUrl: 'cbp-button.scss',
})
export class CbpButton {
  private button: any; // HTMLButtonElement or HTMLAnchorElement
  private controlTarget: any;

  private persistedAttrs: any;

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

  /** @Internal Specifies that a button should not be keyboard navigable by setting its tabindex to -1. This property should only be used in very specific cases. */
  @Prop() pointerOnly: boolean;

  /** Marks the rendered button/link in a disabled state when specified. */
  @Prop() disabled: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

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

    /*
     * For internal use primarily:
     * Persist aria-* (and role) attributes on the host down to the rendered element, then remove them from the host.
     * This is done once and is not reactive.
     * Needs testing and possibly refinement/refactoring.
     */
    let hostattrs = getElementAttrs(this.host);
    this.persistedAttrs = Object.fromEntries(
      Object.entries(hostattrs).filter(
        ([key]) => ( key.includes('aria') || key == 'role' )
      )
    );
  }

  componentDidLoad() {
    // If the button was not defined by ref in the render lifecycle, query the DOM for one that may have been slotted and attach an event listener to it
    if (!this.button) {
      const slottedButton = (this.button = this.host.querySelector('button,a'));
      if (slottedButton) {
        this.button = slottedButton;
        this.button.addEventListener('click', this.handleClick);
      }
    }

    setCSSProps(this.button, {
      'min-width': this.width,
      'min-height': this.height,
    });

    // Remove any persisted aria-* attributes from the host because they don't really make sense there.
    for (const [key] of Object.entries(this.persistedAttrs)) {
      this.host.removeAttribute(key);
    }

    this.componentLoad.emit({
      host: this.host,
      nativeElement: this.button,
      value: this.button.tagName == 'button' ? this.button.value : null,
    });
  }

  render() {
    const { type, value, pressed, expanded, disabled, rel, target, href, download } = this;

    const attrs =
      this.tag === 'button'
        ? {
            type,
            value,
            disabled,
          }
        : {
            download,
            href,
            rel,
            target,
          };

    if (this.host.querySelector('[slot=cbp-button-custom]')) {
      return (
        <Host>
          <slot name="cbp-button-custom" />
        </Host>
      );
    } 
    else if (this.tag === 'button') {
      return (
        <Host>
          <button
            {...this.persistedAttrs}
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
            {...this.persistedAttrs}
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
