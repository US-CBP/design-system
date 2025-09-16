import { Component, Prop, State, Element, Event, EventEmitter, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * The Code Snippet component is used to display code in a readable format and facilitate copying it.
 * 
 * @slot - Raw, unescaped code is slotted in the default slot and escaped for display purposes.
 */
@Component({
  tag: 'cbp-code-snippet',
  styleUrl: 'cbp-code-snippet.scss',
})
export class CbpCodeSnippet {
  @Element() host: HTMLElement;

  private codeBlock;
  private toggleButtonText = 'Show More';
  private toggleButtonRotate = 90;

  /** Specifies inline or block layouts of the code snippet. Defaults to inline. */
  @Prop({ reflect: true }) variant: 'inline' | 'block' = 'inline';

  /** Specifies the height (in CSS units) for a multiple line block variant while not expanded. */
  @Prop() height: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  // There are issues with allowing the component to render expanded, so make this a state that defaults to no expanded.
  @State() expanded: boolean = false;
  @State() codeContainerHeight: number;
  @State() codeBlockHeight: number;


  /** Emits a custom event when the "Copy" button is activated, copying the code to the clipboard. */
  @Event() copyTextClick: EventEmitter;
  copyText(e) {
    navigator.clipboard.writeText(this.codeBlock);
    this.copyTextClick.emit({
      host: this.host,
      code: this.codeBlock,
      nativeEvent: e
    });
  }

  /** Emits a custom event when the the "Show More/Less" control is activated (for code blocks overflowing the specified height). */
  @Event() toggleShowAllClick: EventEmitter;
  toggleShowAll(e) {
    // Toggle the expanded state last, after logic checks, to cause a re-render.
    this.expanded = !this.expanded;
    this.toggleShowAllClick.emit({
      host: this.host,
      expanded: this.expanded,
      nativeEvent: e
    });
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }


  // TechDebt: This is not reactive to changes to the slotted code (and making it reactive may not be trivial).
  componentDidLoad() {
    if (this.height != null && !this.expanded) {
      this.host.style.setProperty('--cbp-code-snippet-max-height', this.height);
    }

    // Trim and escape tags and insert into the `code` element.
    this.codeBlock = this.host.querySelector('div').innerHTML.trim();
    this.host.querySelector('code').innerHTML = this.codeBlock.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    setTimeout(() => {
      // timeout need for innherHTML to render and get correct dimensions
      this.codeContainerHeight = this.host.offsetHeight;
      this.codeBlockHeight = this.host.querySelector('pre').scrollHeight;
    }, 100);
  }

  render() {
    if(this.variant == "block" && !!this.height) {
      if (this.expanded) {
        this.host.style.setProperty('--cbp-code-snippet-max-height', 'auto');
        this.toggleButtonRotate = 270;
        this.toggleButtonText = 'Show Less';
      }
      else {
        this.host.style.setProperty('--cbp-code-snippet-max-height', this.height);
        this.toggleButtonRotate = 90;
        this.toggleButtonText = 'Show More';
      }
    }

    return (
      <Host>
        <div hidden>
          <slot />
        </div>
        <pre>
          <code></code>

          {this.variant == 'block' && 
            <cbp-button 
              type="button"
              fill="ghost" 
              color="secondary" 
              variant='square' 
              accessibilityText='Copy' 
              onClick={(e) => this.copyText(e)} 
              context={this.context}
            >
              <cbp-icon name="clone"></cbp-icon>
            </cbp-button>
          }
        </pre>

        { (this.expanded || this.height && this.codeContainerHeight < this.codeBlockHeight) && 
          <cbp-button 
            fill="ghost" 
            color="secondary" 
            expanded={`${this.expanded}`} 
            context={this.context}
            onClick={(e) => this.toggleShowAll(e)} 
          >
            <cbp-icon name="chevron-right" rotate={this.toggleButtonRotate}></cbp-icon>
            {this.toggleButtonText}
          </cbp-button>
        }
      </Host>
    );
  }
}
