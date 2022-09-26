import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', Calibri, Tahoma, sans-serif;
  }
  
  body {
    border: 0;
    margin: 0;
    padding: 0;
  }

  a {
    font-size: 14px;
  }
`;

export default GlobalStyle;
