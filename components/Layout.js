import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, headerShadow }) => (
  <>
    <Header shadow={headerShadow} />
    <main>{children}</main>
    <Footer />

    <style global jsx>{`
      body {
        font-family: "IBM Plex Sans", sans-serif;
        color: #29333d;
      }
    `}</style>
  </>
);

export default Layout;
