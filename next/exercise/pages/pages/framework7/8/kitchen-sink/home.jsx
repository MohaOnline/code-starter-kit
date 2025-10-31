import { Page, Navbar, Block } from 'framework7-react';

export default function Home() {
  return (
    <Page name="home">
      <Navbar title="Framework7 Next.js" />
      <Block>
        <p>Hello world from Next.js with Framework7 8.x!</p>
        <p>This page is now properly loaded without SSR issues.</p>
      </Block>
    </Page>
  );
}