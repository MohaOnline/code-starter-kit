import {ThemeProvider} from 'next-themes';

import '@/app/notebooks/css/page.css';

export const metadata = {
  title: 'HTMLAreaV2 Demo - Create Next App',
  description: 'HTMLAreaV2 component demo with auto-height and improved toolbar behavior',
};

export default function RootLayout({children}) {
  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
  );
}