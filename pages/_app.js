import '@/styles/globals.css'

import { ThemeProvider } from '@material-tailwind/react';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> 
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet" />
      
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
