'use client';

import Link from "next/link";
import Script from "next/script";

import React, {useEffect, memo, useMemo, useState} from 'react';

import {Autocomplete, Button, Checkbox, Chip, ListSubheader, Stack, TextField, useTheme} from '@mui/material';
import {styled, lighten, darken} from '@mui/system';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import {useElement4HeadSupplement} from '@/lib/customHooks.js';
import {
  TagFieldGroupSingle,
  TagFieldSingle,
} from '@/lib/components/mui/TagFields';
import {Panel} from '@/lib/components/tailwind/panel/v01';
import {LoremIpsumSectionNDiv} from "@/lib/components/custom/lorem-ipsum/v01.jsx";
import {ExampleShowcase} from '@/lib/components/custom/showcase/v01';

import {decorateAndGroupClasses} from '@/pages/tailwind/common/utils';
import {
  tailwind_classes_text_smoothing,
  tailwind_classes_text_size, tailwind_classes_text_weight, tailwind_classes_text_transform,
  tailwind_classes_text_align, tailwind_classes_letter_spacing, tailwind_classes_decoration, tailwind_classes_vertical_align, tailwind_classes_boxing_margin,
  tailwind_classes_boxing_padding, tailwind_classes_boxing_border, tailwind_classes_boxing_size,
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
  const extractClassNames =
    (prefix) => (Object.entries(textClasses)
                       .filter(([attribute, value]) => attribute.startsWith(prefix) && value) // 取出来的格式：[[attribute, [fieldValues]], ...]
                       .flatMap(([attribute, options]) => options)  // [...fieldValues, ...fieldValues, ...] 解一层数组
                       .map((option) => typeof option === 'string' ? option : option.name)
                       .join(" "));

  const updateStateTextClasses = (item, value) => {
    textClasses[item] = value;

    if (item !== 'header') {
      textClasses.header = extractClassNames('header_');
    }

    // 遍历所有 key，筛选出 text_ 开头的，拼接起来
    textClasses.text = extractClassNames('text_');

    // 有前缀的属性的值应该是：Array[option|string]
    textClasses.decoration = extractClassNames('decoration_');
    textClasses.vertical = extractClassNames('vertical_');
    textClasses.container_boxing = extractClassNames('container_boxing_');
    textClasses.container_items_boxing = extractClassNames('container_items_boxing_');

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
                               updateStateTextClasses('header_transform', values);
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
                               updateStateTextClasses('text_smoothing', values);
                             }}
        />

        <TagFieldGroupSingle label={'Letter Spacing'}
                             options={decorateAndGroupClasses(tailwind_classes_letter_spacing)}
                             updateHandler={(values) => {
                               updateStateTextClasses('text_spacing', values);
                             }}
        />

        <TagFieldGroupSingle label={'Decoration Line'}
                             options={decorateAndGroupClasses(tailwind_classes_decoration)}
                             width={400}
                             limitTags={2}
                             updateHandler={(values) => {
                               updateStateTextClasses('decoration_line', values);
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

        <div className="relative rounded-xl overflow-auto p-8">
          <div className="bg-white h-16 py-4 rounded-lg shadow-lg ring-1 ring-slate-900/5 max-w-xl mx-auto dark:bg-slate-800 dark:ring-0 dark:highlight-white/5">
            <div className={`leading-none relative `}>

              <span className={`w-8 h-8 inline-block ${textClasses.vertical} bg-green-200`}>
                <span className="absolute top-0 border-slate-400 border-t border-b border-dashed w-full h-8 dark:border-slate-700"></span>
                <span className="absolute top-0 border-blue-400 border-b border-dashed w-full h-[17px] dark:border-slate-700"></span>
              </span>
              <span className={`relative z-10 text-slate-700 font-medium px-4 dark:text-slate-200 bg-red-200`}>
                我是连带效果，The quick brown fox jumps over the lazy dog.
              </span>

            </div>
          </div>
        </div>

      </section>

      <Stack spacing={2} direction="row" className={'mt-2'}>
        <TagFieldGroupSingle label={'Vertical Align'}
                             options={decorateAndGroupClasses(tailwind_classes_vertical_align)}
                             width={280}
                             updateHandler={(values) => {
                               updateStateTextClasses('vertical_align', values);
                             }}
        />
      </Stack>

      <Panel title={'Container Properties'}>

        <Stack spacing={2} direction="row" className={'mt-2'}>
          <TagFieldGroupSingle label={'Boxing: Margin'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_margin)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_boxing_margin', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Padding'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_padding)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_boxing_padding', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Border'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_border)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_boxing_border', values);
                               }}
          />
        </Stack>

        <Stack spacing={2} direction="row" className={'mt-2'}>
          <TagFieldGroupSingle label={'Boxing: Size'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_size)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('boxing_size', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Padding'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_padding)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('boxing_padding', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Border'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_border)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('boxing_border', values);
                               }}
          />
        </Stack>
      </Panel>

      <Panel title={'Items Properties'}>

        <Stack spacing={2} direction="row" className={'mt-2'}>
          <TagFieldGroupSingle label={'Boxing: Margin'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_margin)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_items_boxing_margin', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Padding'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_padding)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_items_boxing_padding', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Border'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_border)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_items_boxing_border', values);
                               }}
          />
        </Stack>

        <Stack spacing={2} direction="row" className={'mt-2'}>
          <TagFieldGroupSingle label={'Boxing: Size'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_size)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_items_boxing_size', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Padding'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_padding)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_items_boxing_padding', values);
                               }}
          />
          <TagFieldGroupSingle label={'Boxing: Border'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_border)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_items_boxing_border', values);
                               }}
          />
        </Stack>
      </Panel>

      <LoremIpsumSectionNDiv n={4} sectionClasses={`border ${textClasses.container_boxing} `} contentClasses={`border ${textClasses.container_items_boxing}`}/>

      <ExampleShowcase>
        <h1>Your content here</h1>
        <p>This will be displayed inside the resizable container</p>
      </ExampleShowcase>
    </>
  );
}