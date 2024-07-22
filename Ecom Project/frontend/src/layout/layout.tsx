import React, { ReactNode } from "react";
import Helmet from "react-helmet";
import { Outlet } from "react-router-dom";
import Footer from './footer';
import Header from './header';



type LayoutProps = {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  children?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  title = "Ecommerce App",
  description = "Mern Stack Projects",
  keywords = "react,bun,typescript",
  author = "manish",
}) => {
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header />
        
        <main style={{ minHeight: "100vh"}}>
            
            <Outlet />
        </main>
        <Footer/>
      </div>
    </>
  );
}
// whr is sidebar used
