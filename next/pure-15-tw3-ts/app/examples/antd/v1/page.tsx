// https://dsheiko.com/weblog/nextjs-15-tutorial/
import '@ant-design/v5-patch-for-react-19';

import React from 'react';

import { Button } from 'antd';

const  examplesAntDPage =() => {

  return (
    <>
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    </>
  );
}

export default examplesAntDPage;