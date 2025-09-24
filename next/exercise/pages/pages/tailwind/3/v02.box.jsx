import {Stack} from "@mui/material";

import {Panel} from "@/lib/components/tailwind/panel/v01";
import {TagFieldGroupSingle} from "@/lib/components/mui/TagFields";
import {decorateAndGroupClasses} from "@/pages/tailwind/common/utils";
import {
  tailwind_classes_boxing_border, tailwind_classes_boxing_margin,
  tailwind_classes_boxing_padding, tailwind_classes_boxing_size
} from "@/pages/tailwind/3/v02.tailwind-utils";
import {LoremIpsumSectionNDiv} from "@/lib/components/custom/lorem-ipsum/v01";
import React, {useState} from "react";

export function BoxModel() {
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

  return (
    <>
      <Panel title={'Container Properties'}>
        <Stack spacing={2} direction="row" className={'mt-2'} flexWrap={'wrap'} useFlexGap>
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

          <TagFieldGroupSingle label={'Boxing: Size'}
                               options={decorateAndGroupClasses(tailwind_classes_boxing_size)}
                               width={400}
                               limitTags={2}
                               updateHandler={(values) => {
                                 updateStateTextClasses('container_boxing_size', values);
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
      </Panel>

      <Panel title={'Items Properties'}>
        <Stack spacing={2} direction="row" className={'mt-2'} flexWrap={'wrap'} useFlexGap>
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

      <LoremIpsumSectionNDiv n={4} sectionClasses={`${textClasses.container_boxing} `} contentClasses={`${textClasses.container_items_boxing}`}/>
    </>
  )
}
