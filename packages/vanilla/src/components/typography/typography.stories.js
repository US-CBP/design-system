export default {
  title: 'Foundations/Typography',
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

const Template = ({ label, ...args }) => {
  return `
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    
    <hgroup>
      <h2>Heading 2</h2>
      <p>Some related text in the heading group.</p>
    </hgroup>

    <p>Paragraph text</p>
    
    <blockquote>Blockquote</blockquote>
    <blockquote>Blockquote with <cite>Citation</cite></blockquote>

    <pre>Pre-formatted text</pre>
    
    <address>Address</address>

    <noscript>Noscript is a block-level element that only displays if JavaScript is disabled.</noscript>

    <hr>

    <div>
        <b>Bold</b>
        <strong>Strong</strong>
        <i>Italic</i>
        <em>Emphasis</em>
        <u>Underline</u>
        <del>Del</del>
        <ins>Ins</ins>
        <mark>Mark</mark>
        <abbr>Abbreviation</abbr>
        <dfn>Definition</dfn>
        <s>Strikethrough</s>
        <sub>Subscript</sub>
        <sup>Superscript</sup>
        <samp>Sample</samp>
        <code>Code</code>
        <kbd>Keyboard</kbd>
        <var>Variable</var>
        <a>Anchor (Empty)</a>
        <a href="javascript:void(0)">Anchor (Link)</a>
        <q>Quote</q>
        <small>Small</small>
        <span>Span</span>
    </div>

    <ul>
        <li>Item A</li>
        <li>Item B
          <ul>
            <li>Item a</li>
            <li>Item b</li>
          </ul>
        </li>
        <li>Item C</li>
    </ul>
    
    <ol>
        <li>Item 1</li>
        <li>Item 2
          <ol>
            <li>Item A</li>
            <li>Item B</li>
          </ol>
        </li>
        <li>Item 3</li>
    </ol>
    
    <dl>
        <dt>Definition Term</dt>
        <dd>Definition description</dd>
        <dt>Definition Term</dt>
        <dd>Definition description</dd>
    </dl>
  `;
};

export const Typography = Template.bind({});
Typography.args = {};
