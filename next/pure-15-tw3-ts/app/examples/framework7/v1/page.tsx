"use client"
// https://framework7.io/react/init-app
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';
import { App, Toolbar, NavRight, Panel, View, Page, Navbar, Block, Button, Popup, Link, theme, f7 } from 'framework7-react';

// Init plugin
Framework7.use(Framework7React)

import "framework7/css/bundle";
import "framework7-icons/css/framework7-icons.css";
import "material-icons/iconfont/material-icons.css";


const  examplesFramework7Page =() => {


  return (
    <>

      <App theme="auto" name="My App">
        <Page>
        <Navbar title="Accordion" />
        </Page>
      </App>
    </>
  );
}

export default examplesFramework7Page;