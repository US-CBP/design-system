import Link from "next/link";
import Head from "next/head";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import GlobalStyle from "./globalStyles";
import SideMenu from "./sideMenu";

const StyledHeader = styled.header`
  align-items: center;
  background-color: #1a4480;
  color: #ffffff;
  display: flex;
  font: 14px;
  height: 50px;
  justify-content: space-between;
  padding: 0 20px;
  
  a {
    color: inherit;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.12px;
    text-decoration: none;
  }

  a > strong {
    font-weight: 400;
  }

  .view-log a {
    font-size: 10.5px;
    font-weight: 300;
  }
`

const StyledMain = styled.main`
  display: flex;
`

const StyledContent = styled.section`
  display: inherit;
  justify-content: center;
  width: 100%;
`

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>U.S. CBP Design System</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyle />
      <StyledHeader>
        <Link href="/" className="brand">
          <a><strong>CBP</strong>&nbsp;Design System</a>
        </Link>
        <div className="view-log">
          <Link href="/">Changelog</Link>
          <FontAwesomeIcon icon={faGithub} style={{margin: '0 8px'}} />
          <Link href="/">View on Github</Link>
        </div>
      </StyledHeader>
      <StyledMain>
        <SideMenu />
        <StyledContent>
          {children}
        </StyledContent>
      </StyledMain>
    </>
  );
};

export default Layout;
