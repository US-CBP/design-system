export default {
    title: 'Introduction',
    parameters: {
      options: { showPanel: false },
    },
  };


const Template = () => {
    return `
    <cbp-app>
        <img src="assets/images/cbp-seal.svg" height="245" width="245" style="margin-bottom: 2rem; margin-inline: auto" />

        <cbp-typography tag="h1" sx='{"text-align":"center","margin-bottom":"1rem"}'>CBP Design System</cbp-typography>

        <cbp-typography tag="h2" sx='{"margin-bottom":"1rem"}'>Work in Progress</cbp-typography>

        <p>
            The CBP Design System (1.0) is still in a stage of **very active development**.
            As such, much of the code base is still somewhat fragile and may break at any time. 
            While we encourage you to explore our offerings, please do so with the knowledge that the codebase in these repositories will change rapidly and with little warning. 
            Use at your own risk. We will communicate when a stable release will be made available.
        </p>
    </cbp-app>
  `;
};
  
export const Introduction = Template.bind({});
  