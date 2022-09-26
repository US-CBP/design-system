import Link from "next/link";
import styled from "styled-components";

const StyledSideNav = styled.nav`
  background-color: #f6f6f6;
  height: 100vh;
  padding-left: 24px;
  padding-top: 24px;
  width: 280px;

  .nav-header-link {
    color: #00416a;
    display: inline-block;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.12px;
    margin-bottom: 1rem;
    text-decoration: none;
  }

  .nav-header {
    color: #222222;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.12px;
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const StyledMenuList = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    font-size: 14px;
    font-weight: 300;
    margin-top: 0;
    margin-bottom: 12px;
  }
`

const SideMenu = () => {
  return (
    <aside>
      <StyledSideNav>
        <Link href="/getting-started">
          <a className="nav-header-link">Getting Started</a>
        </Link>
        <h6 className="nav-header">Foundation</h6>
        <StyledMenuList>
          <li>
            <Link href="/foundations/colors">Colors</Link>
          </li>
          <li>Iconography</li>
          <li>Interactivity</li>
          <li>Layouts, Grid, Spacing</li>
          <li>Typography</li>
        </StyledMenuList>
        <h6 className="nav-header">Components</h6>
        <StyledMenuList>
          <li>Accordion</li>
          <li>Buttons</li>
          <li>
            <Link href="/components/file-uploader">File Uploader</Link>
          </li>
        </StyledMenuList>
        <h6 className="nav-header">Patterns</h6>
        <StyledMenuList>
          <li>Headers</li>
        </StyledMenuList>
      </StyledSideNav>
    </aside>
  );
};

export default SideMenu;
