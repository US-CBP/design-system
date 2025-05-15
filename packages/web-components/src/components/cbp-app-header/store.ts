import { createStore } from "@stencil/store";

// All strings
const { state } = createStore({
  currentPage: null,
  currentParent: null,
  activeItemName: '',
});

export default state;