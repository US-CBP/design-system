import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  currentPage: null,
  currentParent: null,
  activeItemName: '',
});

onChange('currentPage', value => {
  state.currentPage = value;
});

onChange('currentParent', value => {
  state.currentParent = value;
})

onChange('activeItemName', value => {
  state.activeItemName = value;
  updateSelected();
});

function updateSelected(){
  resetSubNav();
  let subNavItem = document.querySelectorAll(`[name="${state.activeItemName}"]`)[1] as HTMLCbpSubnavItemElement;
  subNavItem.open=true;
  setTimeout(() => {subNavItem.querySelector('a').focus()}, 101) //Note: Time 101 is set due to cbp-drawer setting @ 100
}

function resetSubNav(){//TechDebt: move this to the subNav file
  let subnav = document.querySelectorAll('cbp-subnav-item');

  subnav.forEach(e => { e.hasAttribute("open") ? e.open=false : '' }); 
}

export default state;