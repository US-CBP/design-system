import { createStore } from "@stencil/store";

// All strings
const { state } = createStore({
  currentPage: undefined,
  currentParent: undefined,
  activeItemName: undefined,
});

export default state;