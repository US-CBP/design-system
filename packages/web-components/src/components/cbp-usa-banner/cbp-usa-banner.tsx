import { Component, Prop, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'cbp-usa-banner',
  styleUrl: 'cbp-usa-banner.scss'
})
export class CbpUsaBanner {

  @Element() host: HTMLElement;

  /** When set, specifies that the banner is open */
  @Prop({ reflect: true }) open: boolean;

  // /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  // @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  // /** A custom event emitted when the banner link control is activated. */
  handleClick() {
    // e.preventDefault();
    this.open = !this.open;
    //set aria-expanded if it isn't comine with button
  }

  render() {
    return (
      <Host>
         <section aria-label="Official website of the United States government">
           <header class="cbp-banner">
      
           <div class="cbp-banner__title">
              <img src="../assets/images/us_flag_small.png" height="11" width="16" alt="usa logo" />
              <span>
                <span>An official website of the United States government.</span>
                <cbp-button
                  class='cbp-usa-banner-expand'
                  fill='ghost'
                  accessibility-text='open banner content'
                  target-prop="open"
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
                  <p>A <strong>lock</strong> (<i class="fas fa-lock"></i>) or <strong>https://</strong> means you&#39;ve safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
                </div>
              </div>
            </div>
          </header>
        </section>
      </Host>
    );
  }

}
