import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

export class CbpTreeviewItem {
@Element() host: HTMLCbpTreeviewItemElement;

/**
 * determines if treeviewItem is a parent to other treeviewItems
 */
@Prop({reflect: true}) parent: boolean; //TODO: remove to use name fore the parentNode ln 43

/**
 * children treeview items of a parent treeview item
 */
@Prop({mutable: true}) childrenItems;

/**
 * Label to be displayed in the control of the treeview item.
 */
@Prop({ reflect: true}) label: string;

/**
 * determines if the component is in an open or expanded state
 */
@Prop({reflect: true, mutable: true}) open: boolean = false;

/**
 * determines if the control for the treeview-item is slotted, if true the default checkbox will not be rendered
 */
@Prop() slottedControl: boolean;

/**
 * used to determing if the treeviewItem is in a checked state
 */
@Prop({mutable: true}) treeviewItemChecked: boolean; //TODO: does this need to be updated from boolean to true/indeterimate/false ?

@Event() treeviewItemUpdate: EventEmitter;

private children;

private parentNode; //TODO: rename this to parent and refactor out the Prop

content !: HTMLElement
checkbox !: HTMLCbpCheckboxElement

@Listen('stateChanged')
  handleCheck(e){
    e.stopPropagation();

    let checkbox = e.target;


    this.treeviewItemChecked = checkbox.checked;
    this.host.setAttribute('aria-selected', checkbox.checked)

    if (this.content && this.content.querySelectorAll('cbp-checkbox')) { 
      let childCheckbox = this.content.querySelectorAll('cbp-checkbox') as unknown as HTMLCbpCheckboxElement[];
        childCheckbox.forEach(a => {
        a.indeterminate = false;
        if(checkbox.checked == true){
          a.checked = true;
        } else{ 
          a.checked = false;
        }
      });
    }
    
    this.treeviewItemUpdate.emit({
      host: this.host,
      parent: this.parentNode, //TODO: rename this to parent and refactor out the Prop
      checked: checkbox
    })
  }
    
  @Listen('treeviewItemUpdate')
    handleTreeviewItemUpdate(e){ //TODO: can get some weird states for 'unchecking' children not updating parent/grandparents to correct state
      if(this.host == e.detail.parent){

      console.log('event: ', e)

      let selectedChildren = 0;

      for (let i = 0; i < this.children.length; i++){
        if(this.children[i].treeviewItemChecked){ 
        selectedChildren= selectedChildren + 1;
        }
      }

    if(this.children.length == selectedChildren){
      this.checkbox.checked = true;
      this.checkbox.indeterminate = false;
      this.host.treeviewItemChecked = true
    }else if(this.children.length > selectedChildren && selectedChildren != 0){
      this.checkbox.checked = false;
      this.checkbox.indeterminate = true;
      this.host.treeviewItemChecked = true
    }else{
      this.checkbox.checked = false;
      this.checkbox.indeterminate = false;
      this.host.treeviewItemChecked = false
    }

    if(e.detail.parent.tagName == 'CBP-TREEVIEW-ITEM'){
      
      this.treeviewItemUpdate.emit({
        host: this.host,
        parent: this.parentNode, //TODO: rename this to parent and refactor out the Prop
        checked: this.host.querySelector('cbp-checkbox')
      })
    }
  }
  }

  toggleOpen(){
    this.open === false ? this.open = true : this.open = false;
  }

componentDidLoad(){
if(this.content){
    let childNodes = this.content.children;
    this.children = Array.from(childNodes).filter(element => {
      return element.tagName === 'CBP-TREEVIEW-ITEM';
    }) as HTMLCbpTreeviewItemElement[];
  }
}


  componentWillLoad(){
    let node = this.host.parentNode as HTMLElement;
    this.parentNode = node.closest("cbp-treeview-item") //TODO: should return closest parent cbp-treeview item
  }

  componentDidRender(){
    if(this.content){
      this.childrenItems = this.content.children.length;
    }
  }

  render() {

    if(this.host.querySelector('cbp-treeview-item')){
      this.parent = true;
    }
  
    return (
      <Host
        role="treeitem"
        aria-expanded={this.open ? 'true' : 'false'}
      >
        <span class="cbp-treeview-control">
          {this.parent &&
          <cbp-button
            variant="square"
            color="secondary"
            fill="ghost"
            class="cbp-treeview-toggle"
            onClick={() => {this.toggleOpen()}}
            targetProp="open"
          >
            <cbp-icon name="caret-down"></cbp-icon>
          </cbp-button>
          } 
          
          {!this.slottedControl &&
            <cbp-checkbox ref={(el) => this.checkbox = el as HTMLCbpCheckboxElement}>
              <input type="checkbox" name="checkbox" />
            </cbp-checkbox>
          }

          <span>{this.childrenItems ? this.label + ' (' + this.childrenItems + ')' : this.label}</span>

          {this.slottedControl &&
            <slot name="treeview-button-control"></slot> 
          }

        </span>
        {this.parent && 
          <div class="cbp-treeview-content" ref={(el) => this.content = el as HTMLElement}>
            <slot></slot>
          </div>
        }  
      </Host>
    );
  }

}
