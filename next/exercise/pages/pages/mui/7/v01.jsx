'use client';

// Next.js 相关导入
import Link from "next/link"; // tailwind v4 - Next.js 链接组件
import Script from "next/script"; // Next.js 脚本组件

// React 核心库
// import React, {useState, useEffect} from 'react';
import * as React from 'react'; // React 主库
import PropTypes from 'prop-types'; // 类型检查库

// MUI 核心组件和工具
import {useTheme, styled} from '@mui/material/styles'; // 主题钩子和样式化组件工厂
import Popper from '@mui/material/Popper'; // 弹出层组件
import ClickAwayListener from '@mui/material/ClickAwayListener'; // 点击外部监听器
import SettingsIcon from '@mui/icons-material/Settings'; // 设置图标
import CloseIcon from '@mui/icons-material/Close'; // 关闭图标
import DoneIcon from '@mui/icons-material/Done'; // 完成图标
import Autocomplete, {autocompleteClasses} from '@mui/material/Autocomplete'; // 自动完成组件和样式类
import ButtonBase from '@mui/material/ButtonBase'; // 基础按钮组件
import InputBase from '@mui/material/InputBase'; // 基础输入组件
import Box from '@mui/material/Box'; // 布局容器组件

// 自定义钩子
import {useElement4HeadSupplement} from '@/lib/customHooks.js';

// 自定义自动完成组件的弹出层样式 - GitHub 风格
const StyledAutocompletePopper = styled('div')(({theme}) => ({
  // 弹出层纸片容器样式
  [`& .${autocompleteClasses.paper}`]: {  // &: 根选择器、即父选择器：div。方括号（+字符串模版）：计算对象属性名，否则需要 ["& ." + autocompleteClasses.paper]
    boxShadow: 'none', // 移除阴影
    margin: 0, // 移除外边距
    color: 'inherit', // 继承文字颜色
    fontSize: 13, // 设置字体大小
  },
  // 选项列表容器样式
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0, // 移除内边距
    backgroundColor: '#fff', // 浅色模式背景色
    // 深色模式样式
    ...theme.applyStyles('dark', {
      backgroundColor: '#1c2128',
    }),
    // 单个选项样式
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto', // 自动高度
      alignItems: 'flex-start', // 顶部对齐
      padding: 8, // 内边距
      borderBottom: '1px solid #eaecef', // 底部边框 - 浅色
      // 深色模式边框
      ...theme.applyStyles('dark', {
        borderBottom: '1px solid #30363d',
      }),
      // 选中状态样式
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent', // 透明背景
      },
      // 聚焦和选中聚焦状态样式
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover, // 悬停背景色
        },
    },
  },
  // 禁用 Portal 时的相对定位
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

/**
 * 自定义弹出层组件 - 用于自动完成组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.disablePortal - 是否禁用 Portal
 * @param {Element} props.anchorEl - 锚点元素
 * @param {boolean} props.open - 是否打开
 * @returns {JSX.Element} 样式化的弹出层组件
 */
function PopperComponent(props) {
  const {disablePortal, anchorEl, open, ...other} = props;
  console.log('PopperComponent 渲染:', {disablePortal, anchorEl, open});
  return <StyledAutocompletePopper {...other} />;
}

// 属性类型检查
PopperComponent.propTypes = {
  anchorEl: PropTypes.any, // 锚点元素
  disablePortal: PropTypes.bool, // 是否禁用 Portal
  open: PropTypes.bool.isRequired, // 是否打开（必需）
};

// GitHub 风格的弹出层样式组件
const StyledPopper = styled(Popper)(({theme}) => ({
  border: '1px solid #e1e4e8', // 边框颜色 - 浅色模式
  boxShadow: `0 8px 24px ${'rgba(149, 157, 165, 0.2)'}`, // 阴影效果
  color: '#24292e', // 文字颜色 - 浅色模式
  backgroundColor: '#fff', // 背景色 - 浅色模式
  borderRadius: 6, // 圆角
  width: 300, // 固定宽度
  zIndex: theme.zIndex.modal, // 层级 - 模态框级别
  fontSize: 13, // 字体大小
  // 深色模式样式
  ...theme.applyStyles('dark', {
    border: '1px solid #30363d', // 深色模式边框
    boxShadow: '0 8px 24px rgb(1, 4, 9)', // 深色模式阴影
    color: '#c9d1d9', // 深色模式文字色
    backgroundColor: '#1c2128', // 深色模式背景色
  }),
}));

// GitHub 风格的输入框样式组件
const StyledInput = styled(InputBase)(({theme}) => ({
  padding: 10, // 外层容器内边距
  width: '100%', // 全宽
  borderBottom: '1px solid #eaecef', // 底部边框 - 浅色模式
  // 深色模式边框
  ...theme.applyStyles('dark', {
    borderBottom: '1px solid #30363d',
  }),
  // 内部输入框样式
  '& input': {
    borderRadius: 4, // 输入框圆角
    padding: 8, // 输入框内边距
    transition: theme.transitions.create(['border-color', 'box-shadow']), // 过渡动画
    fontSize: 14, // 输入框字体大小
    backgroundColor: '#fff', // 输入框背景 - 浅色模式
    border: '1px solid #30363d', // 输入框边框 - 浅色模式
    // 深色模式输入框样式
    ...theme.applyStyles('dark', {
      backgroundColor: '#0d1117', // 深色模式背景
      border: '1px solid #eaecef', // 深色模式边框
    }),
    // 聚焦状态样式
    '&:focus': {
      boxShadow: '0px 0px 0px 3px rgba(3, 102, 214, 0.3)', // 聚焦阴影 - 浅色模式
      borderColor: '#0366d6', // 聚焦边框色 - 浅色模式
      // 深色模式聚焦样式
      ...theme.applyStyles('dark', {
        boxShadow: '0px 0px 0px 3px rgb(12, 45, 107)', // 深色模式聚焦阴影
        borderColor: '#388bfd', // 深色模式聚焦边框色
      }),
    },
  },
}));

// GitHub 风格的按钮样式组件
const Button = styled(ButtonBase)(({theme}) => ({
  fontSize: 13, // 字体大小
  width: '100%', // 全宽
  textAlign: 'left', // 左对齐
  paddingBottom: 8, // 底部内边距
  fontWeight: 600, // 字体粗细
  color: '#586069', // 文字颜色 - 浅色模式
  // 深色模式文字颜色
  ...theme.applyStyles('dark', {
    color: '#8b949e',
  }),
  // 悬停和聚焦状态
  '&:hover,&:focus': {
    color: '#0366d6', // 悬停文字色 - 浅色模式
    // 深色模式悬停文字色
    ...theme.applyStyles('dark', {
      color: '#58a6ff',
    }),
  },
  // 内部文字容器
  '& span': {
    width: '100%', // 全宽
  },
  // 图标样式
  '& svg': {
    width: 16, // 图标宽度
    height: 16, // 图标高度
  },
}));

/**
 * GitHub 风格的标签选择器组件
 * 功能：模拟 GitHub 的标签选择界面，支持多选、搜索过滤等功能
 * @see /pages/mui/3/v01
 * @see /pages/pages/libs/pagesExamplesLayout.tsx
 */
export default function SamplePage() {
  console.log('SamplePage 组件开始渲染');

  // 状态管理
  const [anchorEl, setAnchorEl] = React.useState(null); // 弹出层锚点元素
  const [value, setValue] = React.useState([labels[1], labels[11]]); // 当前已选中的标签（初始选择第2和第12个标签）
  const [pendingValue, setPendingValue] = React.useState([]); // 临时选中的标签（未确认提交前的选择）
  const theme = useTheme(); // 获取当前主题

  console.log('当前状态:', {
    anchorEl: !!anchorEl,
    selectedLabelsCount: value.length,
    pendingLabelsCount: pendingValue.length,
    selectedLabels: value.map(label => label.name)
  });

  /**
   * 处理标签按钮点击事件 - 打开弹出层
   * @param {Event} event - 点击事件对象
   */
  const handleClick = (event) => {
    console.log('标签按钮被点击，准备打开弹出层');
    setPendingValue(value); // 将当前选中的标签复制到临时状态
    setAnchorEl(event.currentTarget); // 设置锚点元素为当前按钮
    console.log('弹出层已打开，临时选中标签:', value.map(label => label.name));
  };

  /**
   * 处理弹出层关闭事件 - 确认选择并关闭弹出层
   */
  const handleClose = () => {
    console.log('准备关闭弹出层');
    console.log('确认选择的标签:', pendingValue.map(label => label.name));
    setValue(pendingValue); // 将临时选择的标签设为最终选择
    if (anchorEl) {
      anchorEl.focus(); // 重新聚焦到按钮元素
    }
    setAnchorEl(null); // 清除锚点元素，关闭弹出层
    console.log('弹出层已关闭');
  };

  // 计算弹出层是否打开和相关属性
  const open = Boolean(anchorEl); // 弹出层是否打开
  const id = open ? 'github-label' : undefined; // 弹出层的 aria-describedby ID

  console.log('弹出层状态:', {open, id});

  return (
    <React.Fragment>
      <Box sx={{width: 221, fontSize: 13}}>
        <Button disableRipple aria-describedby={id} onClick={handleClick}>
          <span>Labels</span>
          <SettingsIcon/>
        </Button>
        {value.map((label) => (
          <Box
            key={label.name}
            sx={{
              mt: '3px',
              height: 20,
              padding: '.15em 4px',
              fontWeight: 600,
              lineHeight: '15px',
              borderRadius: '2px',
            }}
            style={{
              backgroundColor: label.color,
              color: theme.palette.getContrastText(label.color),
            }}
          >
            {label.name}
          </Box>
        ))}
      </Box>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              sx={(t) => ({
                borderBottom: '1px solid #30363d',
                padding: '8px 10px',
                fontWeight: 600,
                ...t.applyStyles('light', {
                  borderBottom: '1px solid #eaecef',
                }),
              })}
            >
              Apply labels to this pull request
            </Box>
            <Autocomplete
              open // 强制保持打开状态
              multiple // 启用多选模式
              // 处理自动完成组件的关闭事件
              onClose={(event, reason) => {
                console.log('Autocomplete onClose 触发:', reason);
                if (reason === 'escape') {
                  console.log('检测到 ESC 键，关闭弹出层');
                  handleClose();
                }
              }}
              value={pendingValue} // 当前临时选中的标签
              // 处理标签选择变化事件
              onChange={(event, newValue, reason) => {
                console.log('标签选择发生变化:', {
                  reason,
                  newValueCount: newValue.length,
                  newLabels: newValue.map(label => label.name)
                });

                // 阻止通过退格键或删除键移除选项（保持 GitHub 风格的行为）
                if (
                  event.type === 'keydown' &&
                  (event.key === 'Backspace' || event.key === 'Delete') &&
                  reason === 'removeOption'
                ) {
                  console.log('阻止键盘删除操作');
                  return;
                }
                setPendingValue(newValue); // 更新临时选择
              }}
              disableCloseOnSelect // 选择后不自动关闭
              renderValue={() => null} // 不渲染已选择的值（使用自定义渲染）
              noOptionsText="No labels" // 无选项时的提示文字
              renderOption={(props, option, {selected}) => {
                const {key, ...optionProps} = props;
                return (
                  <li key={key} {...optionProps}>
                    <Box
                      component={DoneIcon}
                      sx={{width: 17, height: 17, mr: '5px', ml: '-2px'}}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                    <Box
                      component="span"
                      sx={{
                        width: 14,
                        height: 14,
                        flexShrink: 0,
                        borderRadius: '3px',
                        mr: 1,
                        mt: '2px',
                      }}
                      style={{backgroundColor: option.color}}
                    />
                    <Box
                      sx={(t) => ({
                        flexGrow: 1,
                        '& span': {
                          color: '#8b949e',
                          ...t.applyStyles('light', {
                            color: '#586069',
                          }),
                        },
                      })}
                    >
                      {option.name}
                      <br/>
                      <span>{option.description}</span>
                    </Box>
                    <Box
                      component={CloseIcon}
                      sx={{opacity: 0.6, width: 18, height: 18}}
                      style={{
                        visibility: selected ? 'visible' : 'hidden',
                      }}
                    />
                  </li>
                );
              }}
              // 选项列表：优先显示已选中的标签，然后按原始顺序显示未选中的标签
              options={[...labels].sort((a, b) => {
                // 显示已选中的标签在前面（GitHub 风格排序）
                let ai = value.indexOf(a); // 获取标签 a 在已选列表中的索引
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai; // 如果未选中，则使用原始索引加偏移
                let bi = value.indexOf(b); // 获取标签 b 在已选列表中的索引
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi; // 如果未选中，则使用原始索引加偏移
                const result = ai - bi;

                // 输出排序逻辑（仅在开发模式下）
                if (process.env.NODE_ENV === 'development') {
                  console.log('标签排序:', {
                    labelA: a.name,
                    labelB: b.name,
                    aIndex: ai,
                    bIndex: bi,
                    result
                  });
                }

                return result;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
              slots={{
                popper: PopperComponent,
              }}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
}

// GitHub 标签数据 - 来源: https://github.com/abdonrd/github-labels
// 这个数组包含了常见的 GitHub 项目标签，每个标签包含名称、颜色和描述
const labels = [
  {
    name: 'good first issue', // 标签名称
    color: '#7057ff', // 标签颜色（十六进制）
    description: 'Good for newcomers', // 标签描述
  },
  {
    name: 'help wanted',
    color: '#008672',
    description: 'Extra attention is needed',
  },
  {
    name: 'priority: critical',
    color: '#b60205',
    description: '',
  },
  {
    name: 'priority: high',
    color: '#d93f0b',
    description: '',
  },
  {
    name: 'priority: low',
    color: '#0e8a16',
    description: '',
  },
  {
    name: 'priority: medium',
    color: '#fbca04',
    description: '',
  },
  {
    name: "status: can't reproduce",
    color: '#fec1c1',
    description: '',
  },
  {
    name: 'status: confirmed',
    color: '#215cea',
    description: '',
  },
  {
    name: 'status: duplicate',
    color: '#cfd3d7',
    description: 'This issue or pull request already exists',
  },
  {
    name: 'status: needs information',
    color: '#fef2c0',
    description: '',
  },
  {
    name: 'status: wont do/fix',
    color: '#eeeeee',
    description: 'This will not be worked on',
  },
  {
    name: 'type: bug',
    color: '#d73a4a',
    description: "Something isn't working",
  },
  {
    name: 'type: discussion',
    color: '#d4c5f9',
    description: '',
  },
  {
    name: 'type: documentation',
    color: '#006b75',
    description: '',
  },
  {
    name: 'type: enhancement',
    color: '#84b6eb',
    description: '',
  },
  {
    name: 'type: epic',
    color: '#3e4b9e',
    description: 'A theme of work that contain sub-tasks',
  },
  {
    name: 'type: feature request',
    color: '#fbca04',
    description: 'New feature or request',
  },
  {
    name: 'type: question',
    color: '#d876e3',
    description: 'Further information is requested',
  },
];