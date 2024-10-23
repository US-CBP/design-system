import { default as Animation } from '../../../vanilla/src/tokens/animation.json';
import { default as Border } from '../../../vanilla/src/tokens/border.json';
import { default as Breakpoints } from '../../../vanilla/src/tokens/breakpoints.json';
import { default as Elevation } from '../../../vanilla/src/tokens/elevation.json';
import { default as Space } from '../../../vanilla/src/tokens/space.json';
import { default as Theme } from '../../../vanilla/src/tokens/theme.json';
import { default as Typography } from '../../../vanilla/src/tokens/typography.json';

import { default as Black } from '../../../vanilla/src/tokens/color/black.json';
import { default as Blue } from '../../../vanilla/src/tokens/color/blue.json';
import { default as Cyan } from '../../../vanilla/src/tokens/color/cyan.json';
import { default as Gold } from '../../../vanilla/src/tokens/color/gold.json';
import { default as Gray } from '../../../vanilla/src/tokens/color/gray.json';
import { default as Green } from '../../../vanilla/src/tokens/color/green.json';
import { default as Indigo } from '../../../vanilla/src/tokens/color/indigo.json';
import { default as Magenta } from '../../../vanilla/src/tokens/color/magenta.json';
import { default as Mint } from '../../../vanilla/src/tokens/color/mint.json';
import { default as Orange } from '../../../vanilla/src/tokens/color/orange.json';
import { default as Red } from '../../../vanilla/src/tokens/color/red.json';
import { default as Violet } from '../../../vanilla/src/tokens/color/violet.json';
import { default as White } from '../../../vanilla/src/tokens/color/white.json';
import { default as Yellow } from '../../../vanilla/src/tokens/color/yellow.json';

export default {
  title: 'Design Tokens',
  parameters: {
    options: { showPanel: false },
  },
};

/* Example
  "color": {
    "branding": {
      "cbp": {
        "light": {
          "value": "{color.gray.cool.3}",
          "attributes": { "use": "theme", "type": "primary" }
        },
        "dark": {
          "value": "{color.gray.cool.80}",
          "attributes": { "use": "theme", "type": "primary" }
        }
      },
      "dhs": {
        "blue": {
          "value": "#003366",
          "attributes": { "use": "theme" }
        }
      }
    },
    ...
  }

    ${JSON.stringify(Theme)}
    ${Theme.toString()}
*/

//const AllTokens=[Theme,Typography,Space,Border,Elevation,Animation,Breakpoints];
//const AllTokenNames=['Theme','Typography','Space','Border','Elevation','Animation','Breakpoints'];

const AllTokens = [
  Theme,
  Typography,
  Space,
  Border,
  Elevation,
  Animation,
  Breakpoints,
  Black,
  Blue,
  Cyan,
  Gold,
  Gray,
  Green,
  Indigo,
  Magenta,
  Mint,
  Orange,
  Red,
  Violet,
  White,
  Yellow,
];
const AllTokenNames = [
  'Theme',
  'Typography',
  'Space',
  'Border',
  'Elevation',
  'Animation',
  'Breakpoints',
  'Black',
  'Blue',
  'Cyan',
  'Gold',
  'Gray',
  'Green',
  'Indigo',
  'Magenta',
  'Mint',
  'Orange',
  'Red',
  'Violet',
  'White',
  'Yellow',
];

let output = [];
let currentObj = [];

function iterateObj(obj) {
  for (const property in obj) {
    if (property == 'value') {
      output = [...output, `${currentObj.join('.')}=${obj[property]}`];
      currentObj.pop(); // remove the last item in the array when we've found the value
    } else if (property == 'attributes') {
      return;
    } else if (typeof obj[property] == 'object') {
      currentObj = [...currentObj, property];
      iterateObj(obj[property]);
    }
  }
  currentObj.pop(); // remove the last item in the array when we're done the loop
  return output;
}

function tokenToCSS(str) {
  return '--cbp-' + str.replaceAll('.', '-');
}

function sanitizeTokenValue(str) {
  // If it's referencing a token value, convert that to a CSS variable
  if (/{.+}/.test(str)) {
    let cssVar = str.replace(/[{} ]/g, ''); //(/{}/g,'');
    cssVar = cssVar.replace(/\.value/g, '');
    return `var(--cbp-${cssVar.replaceAll('.', '-')})`;
  } else return str;
}

function outputTableRow(arr) {
  let rows = '';
  arr.forEach(item => {
    let token = item.split('=')[0];
    let value = sanitizeTokenValue(item.split('=')[1]);
    let css = tokenToCSS(token);
    rows += `
    <tr>
      <td>${token}</td>
      <td>${css}</td>
      <td>${value}</td>
    </tr>`;
  });
  return rows;
}

const Template = () => {
  let pageContents = '';

  AllTokens.forEach((item, index) => {
    let contents = iterateObj(item);
    output = [];
    currentObj = [];

    pageContents += `
    <cbp-typography tag="h2" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>${AllTokenNames[index]}</cbp-typography>
    <table>
      <caption hidden>${AllTokenNames[index]}</caption>
      <thead>
        <th>Design Token</th>
        <th>CSS Variable</th>
        <th>Value</th>
      </thead>
      <tbody>
        ${outputTableRow(contents)}
      </tbody>
    </table>`;
  });

  return `
    <main id="design-tokens">
      <cbp-typography tag="h1" sx='{"margin-bottom":"var(--cbp-space-4x)"}'>Design Tokens</cbp-typography>
      <p>
        Design tokens are a platform-agnostic way to represent design decisions, such as those pertaining to colors, typography, font and heading sizes, etc.
        These tokens represent a two-tier system. 
        The top tier consists of abstract colors and values from which to choose.
        The second tier consists of tokens that reference the top-level tokens as their values, such as the "theme" layer.
      </p>
      <p>
        For the web components, these tokens are translated to CSS custom properties (aka CSS variables) and feed directly into the web components' CSS APIs.
        By wrapping your application in the <code>cbp-app</code> web component, these tokens are also exposed for the entire application to leverage.
      </p>
      <p>
        Any web component properties that accept CSS units (as well as the sx property) should reference design tokens rather than "magic numbers."
        Even when writing custom application CSS, design tokens should be used as values whenever possible.
        This extra level of abstraction leads to more maintainable code, reduces design decisions that don't align with the design system, and results in fewer "one-offs."
      </p>

      ${pageContents}
    </main>
`;
};

export const DesignTokens = Template.bind({});
