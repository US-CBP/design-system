import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';

/**
 * The Loader is used as a visual indicator of progress during waiting periods.
 * 
 * @slot - Label text may be provided in the default slot.
 */
@Component({
  tag: 'cbp-loader',
  styleUrl: 'cbp-loader.scss',
})

export class CbpLoader {

  @Element() host: HTMLElement;

  /** Specifies a unique `ID` for the loader, used to wire up the controls and accessibility features. */
  @Prop() progressId: string = createNamespaceKey('cbp-loader');

  /** Defines if the loader will be in displayed as a circular or linear variant*/
  @Prop({ reflect: true }) variant: "circular" | "linear";

  /** Defines the size of the loader render, default value of large */
  @Prop({ reflect: true }) size: "large" | "small" = "large";

  /** Defines if the loader will be in determinate/indeterminate, if true loader will display the current value out of max value*/
  @Prop({ reflect: true }) determinate: boolean = false;

  /** Used in deternminate mode to display the current value of loaded content*/
  @Prop() value: number = 0;

  /** Used in deternminate mode to display the max value of loaded content*/
  @Prop() max: number = 100;

  /** Used to set the text orientation for the circular determinate loader's description*/
  @Prop({ reflect: true }) orientation: "horizontal" | "vertical" = 'horizontal';

  /** Used to set the loader to the 'success' state of the loader */
  @Prop({ mutable: true, reflect: true }) success: boolean;

  /** Used to set the loader to the 'error' state of the loader */
  @Prop({ mutable: true, reflect: true }) error: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    if (this.determinate && this.variant == 'circular') {
      this.host.style.setProperty("--cbp-loader-circular-determinate", `conic-gradient(var(--cbp-loader-color) ${((this.value / this.max) * 100) * 3.6}deg, var(--cbp-loader-track-color) 0deg)`)
    }
  }

  render() {
    let statusIndicator;

    if (this.success) {
      statusIndicator = <cbp-icon name="check-circle" color="var(--cbp-loader-status-indicator-color)"></cbp-icon>
    }
    else if (this.error) {
      statusIndicator = <cbp-icon name="exclamation-circle" color="var(--cbp-loader-status-indicator-color)"></cbp-icon>
    }
    else {
      statusIndicator = Math.round((this.value / this.max) * 100) + "%"
    }

    if(this.success){
      this.value = this.max;
    }

    return (
      <Host>
        <label htmlFor={this.progressId}>
          {(this.success)
            ? `Complete`
            : (this.error
              ? `Error`
              : null
            )
          }
          <slot />

          {(this.success || this.error) && this.variant == 'linear' &&
            <span>{statusIndicator}</span>
          }
        </label>


        {(this.success || this.error) && this.variant == 'circular' && this.size == 'large' &&
          <span class='cbp-loader-desc'>
            {statusIndicator}
          </span>
        }

        {this.variant == 'circular' && this.size == 'small' && (this.success || this.error) ? statusIndicator : ``}

        <progress
          id={this.progressId}
          value={this.determinate ? this.value : null}
          max={this.max}
          hidden={this.determinate && this.variant == 'circular' && this.size == 'small' && (this.success || this.error)}
        >
        </progress>
      </Host>
    );
  }
}
