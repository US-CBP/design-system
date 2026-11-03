import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-security-banner',
  styleUrl: 'cbp-security-banner.scss',
})
export class CbpSecurityBanner {

  //  private content: Node;

  /** Specifies the level of classification of the security banner */
  @Prop({ reflect: true}) classification: 'unclassified' | 'cui' | 'confidential' = 'unclassified';

  /** Sepcifies if the content of the security banner is visible */
  @Prop({reflect: true}) open: boolean =  false;

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  /** Toggle visibility for the security banner content */
  handleClick() {
    this.open = !this.open;
   }

   getContent(){
    
    let content: HTMLCbpTypographyElement

    switch(this.classification){
      case "unclassified":
        content =  <cbp-typography>The system you are accessing is considered <b>CLASSIFIED</b>. You are seeing this warning because the contents of this particular page are <b>UNCLASSIFIED</b>. All individuals handling this information are required to protect it from unauthorized disclosure in the interest of the national security of the United States. Handling. storage. reproduction, and dispoisition of this information must be in accordance with applicable executive orders, statuetes, and agency implementing regulations. Failure to do so wil result in administrative and criminal sanctions. If you are accessing this information from a non-classified device or suspcted information from this page may have been shared improperly, stop what you are doing immediately, and contact your unit's security officer</cbp-typography> as unknown as HTMLCbpTypographyElement
      break;
      case "cui":
        content = <cbp-typography>This page contains information, in whole or part, that is marked <b>CUI</b> (Controlled Unclassified Information) - this marking includes various designations such as <b>LES</b> - Law Enforcement Sensitive and <b>FOUO</b> - For Official Use Only). This page may also include information that is marked at a lower classification level, or unclassified. All individuals handling this information are required to protect it from unauthorized disclousre in the interest of the national security of the United States, Handling, storage, reproduction, and disposition of this information must be in accordance with applicable executive orders, statues, and agency implementing regulations. Failure to do so will result in administrative and criminal sanctions. If you suspect information from this page may have ben shared improperly, stop what you are doing immediately, and contact your unit's security officer.</cbp-typography> as unknown as HTMLCbpTypographyElement
      break;
      case "confidential":
        content = <cbp-typography>This page contains information, in whole or part, that is marked <b>CONFIDENTIAL</b>. This page may also include information that is marked at a lower classification level, or unclassified. All individuals handling this information are required to protect it from unauthorized disclosure in the intreset of the national security of the United States. Handling, storage, reproduction, and disposition of this information must be in accordance with the applicable executive orders, statues, and agency implementing regulations. Failure to do so will result in administrative and criminal sanctions. If your are accessing this information from a non-classified device, stop what you are doing immediately, and contact your unit's security officer.</cbp-typography> as unknown as HTMLCbpTypographyElement
      break;
    }
    
    console.log('Sanity Check: ', content);
    return content
  }

  render() {
    

    return (
      <Host>
        <cbp-flex
          justify-content="center"
        >
          <cbp-typography
            variant="subhead"
            class="cbp-security-banner-header"
          >
            <cbp-icon name="shield" sx='{"margin-inline-end":"var(--cbp-space-1x)"}'></cbp-icon> {this.classification.toUpperCase()}
          </cbp-typography>
          <cbp-button
            class="cbp-security-banner-expand"
            fill="ghost"
            controls="cbp-security-banner-content"
            expanded={`${this.open}`}
            onClick={() => this.handleClick()}
          >
            Learn More
            <cbp-icon name="chevron-right"></cbp-icon>
          </cbp-button>
        </cbp-flex>
        <cbp-flex
          id="cbp-security-banner-content"
          direction="column"
          gap="var(--cbp-space-2x)"
          sx='{"padding-bottom":"var(--cbp-space-4x)"}'
        >
          <cbp-typography
            variant="heading-xs"
            context="dark-always"
            class="cbp-security-banner-content-header"
          >
              <cbp-icon name="file-circle-exclamation"></cbp-icon>{this.classification != 'unclassified' ? 'WARNING' : ''} data access: {this.classification}
          </cbp-typography>
          {this.getContent()}
          <slot />
        </cbp-flex>
      </Host>
    );
  }

}
