import Head from 'next/head';
import NavBar from 'components/Navbar';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="intro">
        <NavBar />
        {children}
      </main>
    </>
  );
};

export default Layout;