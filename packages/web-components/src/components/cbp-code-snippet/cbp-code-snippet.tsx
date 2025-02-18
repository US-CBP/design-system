import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-code-snippet',
  styleUrl: 'cbp-code-snippet.scss'
})
export class CbpCodeSnippet {

  @Element() host: HTMLElement;
  
  private showAllToggle = false;
  private toggleButtonText = 'Show More';
  private toggleButtonRotate = 90;

  /**  Specifies the visual variant of the code snippet*/
  @Prop({ reflect: true }) variant: "inline" | "block";
  
  /** Specifies the min height for a muliple line block variant. If set will populate the 'show more' button on the render to display full height */
  @Prop() maxheight: string; 

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() copyTextClick: EventEmitter;
  copyText(){
    navigator.clipboard.writeText(this.host.querySelector('code').innerHTML);
    this.copyTextClick.emit({
      host: this.host,
    });
  }

  @Event() toggleShowAllClick: EventEmitter;
  toggleShowAll(){
    if(!this.showAllToggle){
      this.host.style.setProperty('--cbp-code-snippet-max-height', 'unset')
      this.showAllToggle = true;
      this.toggleButtonRotate = 270
      this.toggleButtonText = 'Show Less';
    }else{
      this.host.style.setProperty('--cbp-code-snippet-max-height', this.maxheight)
      this.showAllToggle = false;
      this.toggleButtonRotate = 90
      this.toggleButtonText = 'Show More';
    }
    //this.host.closest('cbp-subnav-item cbp-subnav-item cbp-subnav-item')
    console.log(this.host.closest('cbp-code-snippet > cbp-button'));//TODO: local testing
    this.toggleShowAllClick.emit({
      host: this.host
    })
  }
  componentWillLoad() {

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }
  render() {
    this.host.style.setProperty('--cbp-code-snippet-max-height', this.maxheight);
    
    return (
      <Host>
        <pre>
          <code><slot></slot></code>
    
        {this.variant == 'block' &&
          <cbp-button
            type="button"
            fill="ghost"
            color="secondary"
            onClick={() => this.copyText()}
          >
            Copy
          </cbp-button>
        }
        </pre>
        
        {this.maxheight && 
          <cbp-button
            type="button"
            fill="ghost"
            color="secondary"
            onClick={() => this.toggleShowAll()}
          >
            <cbp-icon name='chevron-right' rotate={this.toggleButtonRotate}></cbp-icon>
            {this.toggleButtonText /** TODO: not updating in render */}
          </cbp-button>
        }
      </Host>
    );
  }

}