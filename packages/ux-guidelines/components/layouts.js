import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>U.S. CBP Design System</title>
      </Head>
      <header>
        <Link href="/">
          <a><strong>CBP</strong>&nbsp;Design System</a>
        </Link>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
