'use client';

import Link from "next/link";
import Script from "next/script";

import React, {useState, useEffect} from 'react';

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {styled, lighten, darken} from '@mui/system';

import {useElement4HeadSupplement} from '@/lib/customHooks.js';
import {decorateAndGroupClasses} from '@/pages/tailwind/common/utils';
import {
  TagFieldGroupSingle,
  TagFieldSingle,
} from '@/lib/components/TagFields';
import {ExampleShowcase} from '@/lib/components/custom/showcase/v01';


/**
 * @see /pages/css/flex/v01
 * @see /pages/pages/libs/pagesExamplesLayout.tsx
 */
export default function SamplePage() {

  const [classes, setClasses] = useState({});

  /**
   * SamplePage 正式内容
   *
   * @see /pages/tailwind/3/v03
   */
  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>
      
      <section className={`border`}>
        <div className={`bg-gray-100 ${classes.container}`}>
          <div className={` ${classes.item}`}></div>
          <div className={` ${classes.item}`}></div>
          <div className={` ${classes.item}`}></div>
          <div className={` ${classes.item}`}></div>
        </div>
      </section>
    </>
  );
}