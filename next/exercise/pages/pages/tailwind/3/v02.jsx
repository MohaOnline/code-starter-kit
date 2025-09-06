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

import {
  tailwind_classes_text_smoothing,
  tailwind_classes_text_size, tailwind_classes_text_weight, tailwind_classes_text_transform,
  tailwind_classes_text_align, tailwind_classes_letter_spacing, tailwind_classes_decoration,
} from "./v02.tailwind-text";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

/**
 * @see /pages/tailwind/3/v02
 * @see /pages/pages/libs/pagesExamplesLayout.tsx
 */
export default function SamplePage() {
  const [textClasses, setTextClasses] = useState({});

  /**
   * 把控件的值更新到 React 的 State。
   */
  const updateStateTextClasses = (item, value) => {
    textClasses[item] = value;
    // textClasses.text = [textClasses.text_size, textClasses.text_align].join(' ');

    if (item !== 'header') {
      textClasses.header = Object.entries(textClasses)
                                 .filter(([attribute, value]) => attribute.startsWith("header_") && value) // 只取 header_ 开头 & 有值的
                                 .map(([key, value]) => value)
                                 .join(" ");
    }

    // 遍历所有 key，筛选出 text_ 开头的，拼接起来
    textClasses.text = Object.entries(textClasses)
                             .filter(([attribute, value]) => attribute.startsWith("text_") && value) // 只取 text_ 开头 & 有值的
                             .map(([key, value]) => value)
                             .join(" ");

    if (item !== 'decoration') {
      textClasses.decoration = Object.entries(textClasses)
                                     .filter(([attribute, value]) => attribute.startsWith("decoration_") && value) // 只取 decoration_ 开头 & 有值的
                                     .map(([key, value]) => value)
                                     .join(" ");
    }

    setTextClasses({
      ...textClasses,
    })
  }

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
        <TagFieldGroupSingle label={'Header Transform'}
                             options={decorateAndGroupClasses(tailwind_classes_text_transform)}
                             width={200}
                             updateHandler={(values) => {
                               updateStateTextClasses('header_transform', values.map((value) => {
                                 return typeof value === 'string' ? value : value.name;
                               }).join(' '));
                             }}
        />
      </Stack>
      <Stack spacing={2} direction="row" className={'mt-2'}>

        <TagFieldSingle label={'Text Size'}
                        options={tailwind_classes_text_size}
                        width={150}
                        placeholder={''}
                        updateHandler={(value) => {
                          updateStateTextClasses('text_size', value);
                        }}
        />

        <TagFieldSingle label={'Text Align'}
                        options={tailwind_classes_text_align}
                        width={150}
                        placeholder={''}
                        updateHandler={(value) => {
                          updateStateTextClasses('text_align', value);
                        }}
        />

        <TagFieldGroupSingle label={'Text Smoothing'}
          // options={decorateAndGroupClasses(tailwind_classes_text_smoothing).sort((a, b) => a.group.localeCompare(b.group))}
                             options={decorateAndGroupClasses(tailwind_classes_text_smoothing)}
                             updateHandler={(values) => {
                               updateStateTextClasses('text_smoothing', values.map((value) => {
                                 return typeof value === 'string' ? value : value.name;
                               }).join(' '));
                             }}
        />

        <TagFieldGroupSingle label={'Letter Spacing'}
                             options={decorateAndGroupClasses(tailwind_classes_letter_spacing)}
                             updateHandler={(values) => {
                               updateStateTextClasses('text_letter_spacing', values.map((value) => {
                                 return typeof value === 'string' ? value : value.name;
                               }).join(' '));
                             }}
        />

        <TagFieldGroupSingle label={'Decoration Line'}
                             options={decorateAndGroupClasses(tailwind_classes_decoration)}
                             width={400}
                             limitTags={2}
                             updateHandler={(values) => {
                               updateStateTextClasses('decoration_line', values.map((value) => {
                                 return typeof value === 'string' ? value : value.name;
                               }).join(' '));
                             }}
        />

      </Stack>

      {/*Demo https://www.lipsum.com/ */}
      <section className={'border ' + textClasses.text}>
        <h2 className={textClasses.header}>Title</h2>
        恰恰与<u className={textClasses.decoration}>流行观念</u>相反，Lorem Ipsum并不是简简单单的<span className={textClasses.decoration}>随机文本:装饰内容</span>。它追溯于一篇公元前45年的经典拉丁著作，从而使它有着两千多年的岁数。弗吉尼亚州Hampden-Sydney大学拉丁系教授Richard
        McClintock曾在Lorem Ipsum段落中注意到一个涵义十分隐晦的拉丁词语，“consectetur”，通过这个单词详细查阅跟其有关的经典文学著作原文，McClintock教授发掘了这个不容置疑的出处。Lorem
        Ipsum始于西塞罗(Cicero)在公元前45年作的“de Finibus Bonorum et Malorum”（善恶之尽）里1.10.32 和1.10.33章节。这本书是一本关于道德理论的论述，曾在文艺复兴时期非常流行。Lorem
        Ipsum的第一行”Lorem ipsum dolor sit amet..”节选于1.10.32章节。

        <p className={textClasses.decoration}>下划线装饰可以修饰任意文字段：u、p、span、div、etc。</p>
      </section>


      <ExampleShowcase>
        <h1>Your content here</h1>
        <p>This will be displayed inside the resizable container</p>
      </ExampleShowcase>
    </>
  );
}