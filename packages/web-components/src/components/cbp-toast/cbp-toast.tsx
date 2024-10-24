import { Component, Prop, Host, Watch, h } from '@stencil/core';

@Component({
  tag: 'cbp-toast',
  styleUrl: 'cbp-toast.scss'
})
export class CbpToast {

  /** specifies the icon loaded into the sidebar */
  @Prop() icon: string = 'user';

  /** specifies the color for the toast */
  @Prop({ reflect: true }) color: 'info' | 'danger' | 'success' | 'warning' = 'info';

  /** specifies time in seconds for the toast to be displayed */
  @Prop() timer: 3 | 5 | 10;

  /** When set, specifies that the toast is open */
  @Prop({ reflect: true }) open: boolean = true;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Watch('open')
    watchOpenHandler(newValue: boolean){
      console.log('watchOpenHandler check');
      if(!newValue) {
        console.log('dismiss toast!');
      }
    }

  render() {

    if(this.open && this.timer){
      setTimeout(() => { this.open = false }, this.timer * 1000)
    }
    
    return (
      <Host>
        <div class='cbp-toast-sidebar'>
          <cbp-icon
            size='2rem'
            name={this.icon}
            />
        </div>
        <div class='cbp-toast-container'>
          <span class='cbp-toast-title'>
            <slot name='cbp-toast-title'></slot>
          </span>
          <div class='cbp-toast-content'>
            <slot></slot>
          </div>
          <div class='cbp-toast-button-bar'>
            <slot name='cbp-toast-buttons'></slot>
          </div>
        </div>
      </Host>
    );
  }
}
