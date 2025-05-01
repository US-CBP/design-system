import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  currentPage: null,
  activeItemName: '',
});

onChange('currentPage', value => {
  state.currentPage = value;
});

onChange('activeItemName', value => {
  state.activeItemName = value;
  updateSelected();
});

function updateSelected(){ //TODO: move this to not the store file
  resetSubNav();
  let attr = '[name=\"' + state.activeItemName + '\"]' 
  let subNavItem = document.querySelectorAll(attr)[1] as HTMLCbpSubnavItemElement;
  subNavItem.setAttribute("open", "true");
  setTimeout(() => {subNavItem.querySelector('a').focus()}, 101) //Note: Time 101 is set due to cbp-drawer setting @ 100
}

function resetSubNav(){//TODO: move this to not the store file
  let subnav = document.querySelectorAll('cbp-subnav-item');

  subnav.forEach(e => { e.hasAttribute("open") ? e.removeAttribute("open") : '' }); 
}

export default state;