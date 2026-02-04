import './style.css';

export const metadata = {
  title: 'Words',
  description: 'Help to remember Words',
};

export default function RootLayout({children}) {
  return (
      <>
      {children}
      </>
  );
}
