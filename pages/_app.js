import GlobalProvider from '@/context/GlobalContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {

  return (
    <>
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
    </>
  );
}
