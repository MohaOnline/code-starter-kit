'use client';

import Script from "next/script";
import * as React from "react";

import {Autocomplete, TextField, Chip, Snackbar, Alert} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {styled, lighten, darken} from '@mui/system';

import _ from "lodash";
import {faker} from '@faker-js/faker';

import {randomInt} from '@/lib/utils';

/**
 * 生成随机假文
 */
export function LoremIpsumSectionNDiv({
  sectionClasses = 'border m-2 p-2',
  contentClasses = '',
  n = 6,
}) {
  const [texts, setTexts] = React.useState([]);

  // 仅在客户端生成随机内容，避免 SSR 与客户端初渲染不一致
  React.useEffect(() => {
    console.log('LoremIpsumSectionNDiv useEffect n = ', n);
    const items = _.times(n, () =>
      faker.lorem.sentences({min: 3, max: randomInt(3, Math.max(3, n + 3))})
    );
    setTexts(items);
  }, [n]);

  return (
    <section className={sectionClasses}>
      {texts.map((text, i) => {
        return (
          <div key={i} className={contentClasses}>
            {text}
          </div>
        );
      })}
    </section>
  );
}
