import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-treeview-item',
  styleUrl: 'cbp-treeview-item.scss',
})

export class CbpTreeviewItem {
@Element() host: HTMLElement;

/**
 * determines if treeviewItem is a parent to other treeviewItems
 */
@Prop({reflect: true}) parent: boolean;

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

@Prop({mutable: true}) treeviewItemChecked: boolean;

@Event() treeviewItemUpdate: EventEmitter;

private treeviewItemSiblings;
private checkedSiblings = [];
private parentNode; //TODO: rename this to parent and refactor out the Prop

content !: HTMLElement
checkbox !: HTMLCbpCheckboxElement

@Listen('stateChanged')
  handleCheck(e){
    e.stopPropagation();

    let checkbox = e.target;
    let treeviewItem = checkbox.closest('cbp-treeview-item');

    // console.log('e.target: ', e.target)
    if(this.host == treeviewItem){
      this.treeviewItemChecked = true;
    } else{
      this.treeviewItemChecked = false;
    }

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
    // this.updateSelectedCount();
    // this.handleUpdateParent();
    this.treeviewItemUpdate.emit({
      host: this.host,
      parent: this.parentNode, //TODO: rename this to parent and refactor out the Prop
      // checked: checkbox.checked
      checked: checkbox
    })
  }
    
  @Listen('treeviewItemUpdate')
    // handleTreeviewItemUpdate(e){ //TODO: doesn't seem to be firing up the full chain of parents? might be issue with updateSelectedCount
    handleTreeviewItemUpdate(){
    this.updateSelectedCount();
    // let checkbox = e.detail.parent.querySelector("cbp-checkbox") as HTMLCbpCheckboxElement; //TODO: is this correct? i don't think i should be looking for parent checkbox in child but maybe i just need coffee?

    // console.log('e: ', e)
    // console.log('parent Checkbox: ', checkbox)
    // console.log('this.checkbox: ', this.checkbox)
    // console.log('treeviewItemSiblings: ', this.treeviewItemSiblings);
    // console.log('checkedSiblings: ', this.checkedSiblings)//TODO: not sure this is 100%


    if(this.treeviewItemSiblings.length == this.checkedSiblings.length){
      console.log('checkall')
      this.checkbox.checked = true;
      this.checkbox.indeterminate = false;
    }else if(this.treeviewItemSiblings.length > this.checkedSiblings.length && this.checkedSiblings.length != 0){
      console.log('indeterminate')
      this.checkbox.checked = false;
      this.checkbox.indeterminate = true;
    }else{
      console.log('empty')
      this.checkbox.checked = false;
      this.checkbox.indeterminate = false;
    }
  }

  updateSelectedCount(){
    // this.treeviewItemSiblings.filter((item) => item ==)
    // console.log('treeviewItemSiblings: ', this.treeviewItemSiblings)
    this.checkedSiblings = [];
    for (let i = 0; i < this.treeviewItemSiblings.length; i++){
      if(this.treeviewItemSiblings[i].querySelector('input[type="checkbox"]:checked')){ //TODO: queryselector is firing everywhere, need an aria-checked/ref/prop/class to trigger off of?
      // if(this.treeviewItemSiblings[i].checkbox.checked){
        this.checkedSiblings.push(this.treeviewItemSiblings[i]);
        console.log('treeviewSibilings[i]: ', this.treeviewItemSiblings[i])
      }
      
    }
  }

  toggleOpen(){
    this.open === false ? this.open = true : this.open = false;
  }

  componentWillLoad(){
    let node = this.host.parentNode as HTMLElement;
    this.parentNode = node.closest("cbp-treeview-item") //TODO: should return closest parent cbp-treeview item

    let siblings = this.host.parentNode.children;
    this.treeviewItemSiblings = Array.from(siblings).filter(element => { //TODO: works but type is wrong at the end(?)
      return element.tagName === 'CBP-TREEVIEW-ITEM';
    }) as HTMLCbpTreeviewItemElement[];

    // this.treeviewItemSiblings = this.host.parentNode.children
  }

  componentDidRender(){
    if(this.content){
      this.childrenItems = this.content.children.length;
    }

    // this.treeviewItemSiblings= this.host.parentNode.children
    // this.updateSelectedCount();
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
