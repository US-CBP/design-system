export default {
  title: 'Foundations/Typography/Divider',
  argTypes: {
    title: { 
      name: 'Divider Title',
      description: 'Title of the divider',
      control: 'text' 
    },
    dividerLevel: {
      name: 'Divider Level',
      description: 'Select a divider level',
      control: 'select',
      options: ['xl', 'lg', 'md', 'sm', 'xs']
    },
    headingLevel: {
      name: 'Heading Level',
      description: 'Select a heading level',
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6']
    }
  },
};

const DividerTemplate = ({ title, dividerLevel, headingLevel }) => {
  return `
    <${headingLevel} class="cbp-divider-text cbp-divider-text--${dividerLevel}">${title}</${headingLevel}>
  `;
};

const DividerFillTemplate = ({ title, dividerLevel, headingLevel }) => {
  return `
    <${headingLevel} class="cbp-divider-fill cbp-divider-fill--${dividerLevel}">${title}</${headingLevel}>
  `;
};

export const Text = DividerTemplate.bind({});
Text.args = {
  title: 'Example Text Divider',
  dividerLevel: 'xl',
  headingLevel: 'h2'
};

export const Fill = DividerFillTemplate.bind({});
Fill.args = {
  title: 'Example Text Divider w/ Fill',
  dividerLevel: 'xl',
  headingLevel: 'h2'
};
Fill.storyName = "Text w/ Fill";
