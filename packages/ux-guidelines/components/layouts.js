import Link from "next/link";
import styled from 'styled-components';

import GlobalStyle from "./globalStyles";

const Header = styled.header`
  align-items: center;
  background-color: #074b69;
  color: #ffffff;
  display: flex;
  font: 14px;
  height: 50px;
  justify-content: space-between;
  padding: 0 15px;
  
  a {
    color: inherit;
    font-size: 14px;
    font-weight: 300;
    text-decoration: none;
  }

  .view-log a {
    font-size: 10.5px;
    font-weight: 400;
  }
`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header>
        <Link href="/" className="brand">
          <a><strong>CBP</strong>&nbsp;Design System</a>
        </Link>

        <div className="view-log">
          <Link href="/">Changelog</Link>
          <Link href="/">View on Github</Link>
        </div>
      </Header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
