import './style.css';

export const metadata = {
  title: 'Words',
  description: 'Help to remember Words',
};

export default function RootLayout({children}) {
  return (
      <html lang="en">
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body
          className="antialiased font-sans"
      >
      {children}
      </body>
      </html>
  );
}
