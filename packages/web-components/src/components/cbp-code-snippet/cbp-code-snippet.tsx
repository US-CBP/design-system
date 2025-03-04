import { Component, Prop, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-code-snippet',
  styleUrl: 'cbp-code-snippet.scss'
})
export class CbpCodeSnippet {

  @Element() host: HTMLElement;
  
  private codeBlock;
  private showAllToggle = false;
  private toggleButtonText = 'Show More';
  private toggleButtonRotate = 90;
  // private codeContainerHeight;
  // private codeBlockHeight;

  /**  Specifies the visual variant of the code snippet*/
  @Prop({ reflect: true }) variant: "inline" | "block" = 'inline';
  
  /** Specifies the max height for a muliple line block variant(in CSS units). */
  @Prop() height: string;

  /** Specifies the size of the current height of the code snippet container, used to manage render of 'show more' button */
  @Prop() codeContainerHeight: number

  /** Specifies the size of the current height of the code snippet block, used to manage render of 'show more' button */
  @Prop() codeBlockHeight: number
  
  /** sets the expanded state of the 'show more' button & is passed to the associated cbp-button prop*/
  @Prop() expanded: boolean;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @Event() copyTextClick: EventEmitter;
  copyText(){
    navigator.clipboard.writeText(this.codeBlock);
    this.copyTextClick.emit({
      host: this.host,
    });
  }

  @Event() toggleShowAllClick: EventEmitter;
  toggleShowAll(){
    if(!this.showAllToggle){
      this.host.style.setProperty('--cbp-code-snippet-max-height', 'auto')
      this.showAllToggle = true;
      this.toggleButtonRotate = 270
      this.toggleButtonText = 'Show Less';
    }else{
      this.host.style.setProperty('--cbp-code-snippet-max-height', this.height)
      this.showAllToggle = false;
      this.toggleButtonRotate = 90
      this.toggleButtonText = 'Show More';
    }
    this.expanded = !this.expanded
    this.toggleShowAllClick.emit({
      host: this.host,
      expanded: this.expanded
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


  componentDidLoad(){
    setTimeout(() => { //** timeout need for DOM to render and correct values to populate for below */
      this.codeContainerHeight = this.host.offsetHeight;
      this.codeBlockHeight = this.host.querySelector('pre').scrollHeight;
    }, 100);


    if(this.height != null && !this.expanded){
      this.host.style.setProperty('--cbp-code-snippet-max-height', this.height);
    }
    this.codeBlock = this.host.querySelector('div').innerHTML.trim();
    this.host.querySelector('code').innerHTML = this.codeBlock.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  render() {
    return (
      <Host>
        <div hidden>
          <slot></slot>
        </div>
        <pre>
          <code></code>
    
        {this.variant == 'block' &&
          <cbp-button
            type="button"
            fill="ghost"
            color="secondary"
            onClick={() => this.copyText()}
            context={this.context}
          >
            <cbp-icon name='clone'></cbp-icon>
            Copy
          </cbp-button>
        }
        </pre>
        
        {this.height && (this.codeContainerHeight < this.codeBlockHeight) &&
          <cbp-button
            type="button"
            fill="ghost"
            color="secondary"
            onClick={() => this.toggleShowAll()}
            expanded = {this.expanded}
            context={this.context}
          >
            <cbp-icon name='chevron-right' rotate={this.toggleButtonRotate}></cbp-icon>
            {this.toggleButtonText}
          </cbp-button>
        }
      </Host>
    );
  }

}