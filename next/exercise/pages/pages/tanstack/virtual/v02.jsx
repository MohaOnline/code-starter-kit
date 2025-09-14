'use client';

import Link from "next/link";
import Script from "next/script";

import React, {useState, useEffect} from 'react';

import {css} from '@emotion/react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {styled, lighten, darken} from '@mui/system';

import {useVirtualizer} from '@tanstack/react-virtual';

import {useElement4HeadSupplement} from '@/lib/customHooks.js';
import {decorateAndGroupClasses} from '@/pages/tailwind/common/utils';
import {
  TagFieldGroupSingle,
  TagFieldSingle,
} from '@/lib/components/mui/TagFields.jsx';
import {ExampleShowcase} from '@/lib/components/custom/showcase/v01';
import {Panel} from '@/lib/components/tailwind/panel/v01';
import {LoremIpsumSectionNDiv} from "@/lib/components/custom/lorem-ipsum/v01.jsx";

/**
 * @uri /pages/tanstack/virtual/v02
 */
export default function Pages() {
  // The scrollable element for your list
  const frameRef = React.useRef(null)

  const [words, setWords] = useState([])
  const [needWordsRefresh, setNeedWordsRefresh] = useState(false);

  // 获取单词
  useEffect(() => {
    fetch("/api/notebook-words-english", {
      credentials: "include",
    }).then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        if (words.length === 0) {
          words.push(...data.data);
        }
        setWords(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [needWordsRefresh]);

  const fixedVirtualizer = useVirtualizer({
    count: Math.max(words.length, 0),
    estimateSize: () => 35,
    getScrollElement: () => frameRef.current,
  });
  
  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>

      {/* The scrollable element for your list */}
      <section className={'border'}
               ref={frameRef}
               style={{
                 height: `400px`,
                 overflow: 'auto', // Make it scroll!
               }}
      >
        {/* The large inner element to hold all of the items */}
        <div className={'inner-wrapper'}
             style={{
               height: fixedVirtualizer ? `${fixedVirtualizer.getTotalSize()}px` : '0',
               width: '100%',
               position: 'relative',  // prepare for positioning the items: absolute
             }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {fixedVirtualizer?.getVirtualItems().map((item) => (
            <div
              key={item.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
              }}
            >
              Row {item.index}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}