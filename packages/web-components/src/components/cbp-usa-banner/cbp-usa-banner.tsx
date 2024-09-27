import { Component, Prop, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-usa-banner',
  styleUrl: 'cbp-usa-banner.scss'
})
export class CbpUsaBanner {

  @Element() host: HTMLElement;

  /** When set, specifies that the banner is open */
  @Prop({ reflect: true }) open: boolean;

  // /** A custom event emitted when the banner link control is activated. */
  handleClick() {
    this.open = !this.open;
  }

  render() {
    return (
      <Host>
         <section aria-label="Official website of the United States government">
           <div class="cbp-banner__title">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAG1BMVEUdM7EeNLIeM7HgQCDaPh/bPh/bPx/////bPyBEby41AAAAUElEQVQI123MNw4CABDEwD3jC/9/MQ1BQrgeOSkIqYe2o2FZtthXgQLgbHVMZdlsfUQFQnHtjP1+8BUhBDKOqtmfot6ojqPzR7TjdU+f6vkED+IDPhTBcMAAAAAASUVORK5CYII="
                height="11"
                width="16"
                alt="usa logo" 
              />
              <span>
                <span>Official website of the United States government.</span>
                <cbp-button
                  class='cbp-usa-banner-expand'
                  fill='ghost'
                  target-prop="open"
                  controls='gov-banner'
                  expanded={this.open}
                  onClick={() => this.handleClick()}
                >
                  Here is how you know<cbp-icon name='chevron-right'/>
                </cbp-button>
              </span>
            </div>
            
            <div class="cbp-usa-banner-content" id="gov-banner">
              <div>
                  <cbp-icon 
                    class='cbp-banner-content-icon'
                    color="var(--cbp-color-info-light)"
                    name='landmark'
                    size="1.25rem" 
                  />  
                <div>
                  <strong>Official websites use .gov</strong>
                  <p>A <strong>.gov</strong> website belongs to an official government organization in the United States.</p>
                </div>
              </div>

              <div>
                <cbp-icon 
                  class='cbp-banner-content-icon'
                  color="var(--cbp-color-info-light)"
                  name='lock'
                  size="1.25rem" 
                />
                <div>
                  <strong>Secure .gov websites use HTTPS</strong>
                  <p>A <strong>lock</strong> (<cbp-icon name='lock' />) or <strong>https://</strong> means you&#39;ve safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
                </div>
              </div>
            </div>
        </section>
      </Host>
    );
  }
}
