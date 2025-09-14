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
 * @see /_t
 */
export default function Pages() {
  // The scrollable element for your list
  const parentRef = React.useRef(null)

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  })

  const [words, setWords] = useState([])
  const [needWordsRefresh, setNeedWordsRefresh] = useState(false);

  // 获取单词
  useEffect(() => {
    fetch("/api/notebook-words-english", {
      credentials: "include",
    }).then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setWords(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [needWordsRefresh]);

  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>

      <div>Temp</div>
      {/* The scrollable element for your list */}
      <div className={'border'}
           ref={parentRef}
           style={{
             height: `400px`,
             overflow: 'auto', // Make it scroll!
           }}
      >
        {/* The large inner element to hold all of the items */}
        <div className={''}
             style={{
               height: `${rowVirtualizer.getTotalSize()}px`,
               width: '100%',
               position: 'relative',
             }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              Row {virtualItem.index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}