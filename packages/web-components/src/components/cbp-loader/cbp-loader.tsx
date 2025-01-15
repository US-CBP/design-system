import { Component, Element, Prop, Host, h} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-loader',
  styleUrl: 'cbp-loader.scss',
})

export class CbpLoader {

  @Element() host: HTMLElement;
  
  /** Defines if the loader will be in displayed as a circular or linear variant*/
  @Prop({ reflect: true }) variant: "circular" | "linear";

  /** Defines the color of the loader render, used to express the state of the loader */
  @Prop() color: "progress" | "success" | "error" = 'progress';

  /** Defines the size of the loader render, default value of large */
  @Prop() size: "large" | "small" = "large";

  /** Defines if the loader will be in determinate/indeterminate, if true loader will display the current value out of max value*/
  @Prop({ reflect: true }) determinate: boolean = false;

  /** Used in deternminate mode to display the current value of loaded content*/
  @Prop() value: number = 0;

  /** Used in deternminate mode to display the max value of loaded content*/
  @Prop() max: number = 100;

  /** Used in deternminate mode to display the min value of loaded content*/
  @Prop() min: number = 0;

  /** Used to set the loader to the 'success' state of the loader */
  @Prop() success: boolean;

  /** Used to set the loader to the 'error' state of the loader */
  @Prop() error: boolean;

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
    if(this.value < this.min){ //TODO: not changing color, i think the prop update isn't getting to the html for the css?
      this.error = true;
    }
    
    if(this.success && !this.error){
      this.color = 'success';
    } else if(this.error){
      this.color = 'error';
    }

    if(this.determinate && this.variant == 'circular' && (this.value >= this.min)){
      this.host.style.setProperty("--cbp-loader-circular-determinate", `conic-gradient(var(--cbp-loader-color) ${((this.value / this.max) * 100) * 3.6}deg, var(--cbp-loader-track-color) 0deg)`)
    }
    
  }
 
  render() {
    let statusDescription = '';
    let statusIndicator;

    if (this.color == 'success'){
      statusDescription = <span>Success</span>;
      statusIndicator = <cbp-icon class="statusIndicator" name="check-circle" color='var(--cbp-loader-status-indicator-color)'></cbp-icon>
    }else if(this.color =='error'){
      statusDescription = <span>Error</span>;
      statusIndicator = <cbp-icon class="statusIndicator" name="exclamation-circle" color='var(--cbp-loader-status-indicator-color)'></cbp-icon>
    }else{
      statusDescription = <span>Uploading...</span>;
      statusIndicator =  Math.round((this.value / this.max) * 100) + "%"
    }


    return (
      <Host>
        {this.determinate && this.variant == 'linear' && 
          
            <span class='cbpLoaderDesc'>{statusDescription}
            
              {this.size != 'small' &&
               <span>{statusIndicator}</span>
              }
            </span> 
            
        }
        {this.determinate && this.variant == 'circular' && this.size == 'large' &&
          <span class='cbpLoaderDesc'>
            {statusIndicator}
          </span>  
        }
        {this.determinate && this.variant == 'circular' && this.size == 'small' && this.color != 'progress'
        ?
          statusIndicator
        :
          <progress
            value={this.value}
            max={this.max}
            aria-busy={this.value < this.max ? 'true' : 'false'}
            aria-valuenow={this.value}
            aria-valuemin={this.min}
            aria-valuemax={this.max}
          >
          </progress>
        }
      </Host>
    );
  }
}
