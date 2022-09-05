import Head from "next/head";
import { ReactElement } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactElement|ReactElement[];
};

const Layout = ({ children, ...LayoutProps }: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>Getcha Gadgets</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
