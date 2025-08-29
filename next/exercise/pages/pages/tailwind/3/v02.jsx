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

import {useElement4HeadSupplement} from '@/lib/customHooks.js';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

/**
 * @see /pages/tailwind/4/v02
 * @see /pages/pages/libs/pagesExamplesLayout.tsx
 */
export default function SamplePage() {
  const [textClasses, setTextClasses] = useState({});

  const tailwind_text_size_classes_array = [
    {title: 'text-3xl', text: 'text-3xl',},
    {title: 'text-4xl', text: 'text-4xl',},
    {title: 'text-5xl', text: 'text-5xl',},
    {title: 'text-6xl', text: 'text-6xl',},
    {title: 'text-7xl', text: 'text-7xl',},
  ]

  const tailwind_text_size_classes = [
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'text-6xl',
    'text-7xl',
  ]

  const tailwind_text_color_classes = [
    {title: 'text-orange-100',},
  ];
  /**
   * SamplePage 正式内容
   *
   * @see /pages/tailwind/4/v02
   */
  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>
      <Stack spacing={2} direction="row" className={'mt-2'}>
        <Autocomplete
          freeSolo
          id="tailwind-classes-of-text-size"
          size="small"
          style={{width: 160}}
          options={tailwind_text_size_classes}
          getOptionLabel={(option) => option}
          renderValue={(option, getItemProps) => (
            <Chip size="small" label={option} {...getItemProps()} />
          )}
          renderInput={(params) => <TextField size="small" {...params} label="Classes of Text size"/>}
          onChange={(event, value) => {
            textClasses.text_size = value;
            textClasses.text = textClasses.text_size;

            setTextClasses({
              ...textClasses,
            })
          }}
        />

        <Autocomplete
          multiple
          freeSolo
          disableCloseOnSelect
          id="tailwind-classes-of-text"
          size="small"
          style={{width: 160}}
          options={tailwind_text_size_classes_array}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) => {
            return option.title === value.title;
          }}
          renderOption={(props, option, {selected}) => {
            const {key, ...optionProps} = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option.title}
              </li>
            );
          }}
          renderValue={(selected, getTagProps) =>
            selected.map((option, index) => {
              const {key, ...tagProps} = getTagProps({index});
              return (
                <Chip
                  variant="outlined"
                  label={option.title}
                  key={key}
                  {...tagProps}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"  // 输入框有框
              label="Choose Tailwind Classes of Text"
              placeholder="输入或选择..."
            />
          )}
        /></Stack>

      {/* https://www.lipsum.com/ */}
      <div className={'border ' + textClasses.text}>
        恰恰与流行观念相反，Lorem Ipsum并不是简简单单的随机文本。它追溯于一篇公元前45年的经典拉丁著作，从而使它有着两千多年的岁数。弗吉尼亚州Hampden-Sydney大学拉丁系教授Richard
        McClintock曾在Lorem Ipsum段落中注意到一个涵义十分隐晦的拉丁词语，“consectetur”，通过这个单词详细查阅跟其有关的经典文学著作原文，McClintock教授发掘了这个不容置疑的出处。Lorem
        Ipsum始于西塞罗(Cicero)在公元前45年作的“de Finibus Bonorum et Malorum”（善恶之尽）里1.10.32 和1.10.33章节。这本书是一本关于道德理论的论述，曾在文艺复兴时期非常流行。Lorem
        Ipsum的第一行”Lorem ipsum dolor sit amet..”节选于1.10.32章节。
      </div>

    </>
  );
}