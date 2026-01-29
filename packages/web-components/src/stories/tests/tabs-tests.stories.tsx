export default {
  title: 'Test/Tabs Scrolling',
  argTypes: {
    numberOfCards: {
      control: 'number'
    },
    cardMinWidth: {
      control: 'text'
    }
  },
};



function generateCards(numberOfCards) {
  let html=''
  for (let i=0; i<numberOfCards; i++) {
    html+= `
      <cbp-card>
        <cbp-typography
          tag="h2"
          variant="heading-md"
          slot="cbp-card-title"
          id="card-heading-${i}"
        >
          Card Title
        </cbp-typography>

        <p>Here is an example of some body text for this card.</p>

        <cbp-tabs>
          <cbp-tab name="tab1-${i}">Tab 1</cbp-tab>
          <cbp-tab name="tab2-${i}">Tab 2 is longer</cbp-tab>
          <cbp-tab name="tab3-${i}" selected>Tab 3</cbp-tab>
          <cbp-tab name="tab4-${i}">Tab 4</cbp-tab>
        </cbp-tabs>

        <cbp-tab-panel name="tab1-${i}">
          Tab 1.  
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 
        </cbp-tab-panel>

        <cbp-tab-panel name="tab2-${i}">
          Tab 2. 
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 
        </cbp-tab-panel>

        <cbp-tab-panel name="tab3-${i}">
          Tab 3.
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 
        </cbp-tab-panel>
        
        <cbp-tab-panel name="tab4-${i}">
          Tab 4.
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 

        </cbp-tab-panel>

      </cbp-card>
    `
  }
  return html;
}


// Combobox using Countries data as an asynchronous call: 
const TabsScrollingTemplate = ({ numberOfCards, cardMinWidth }) => {

  return ` 
    <cbp-grid
      grid-template-columns="repeat(auto-fit, minmax(${cardMinWidth},1fr)"
      gap="var(--cbp-space-4x)"
    >
      ${generateCards(numberOfCards)}
    </cbp-grid>
  `;
};

export const TabsScrolling = TabsScrollingTemplate.bind({});
TabsScrolling.args = {
  numberOfCards: 20,
  cardMinWidth: '17rem'
};
