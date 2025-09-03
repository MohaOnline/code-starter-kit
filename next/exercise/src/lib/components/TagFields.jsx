import * as React from "react";
import {Autocomplete, TextField, Chip} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {styled, lighten, darken} from '@mui/system';

import _ from "lodash";
import Script from "next/script.js";
import {decorateAndGroupClasses} from "@/pages/tailwind/common/utils.js";
import {tailwind_classes_text_smoothing} from "@/pages/tailwind/3/v02.tailwind-text.js";

export function TagFieldSingle({
  label = "",
  options = [],
  updateHandler,
  width = 200,
  placeholder = "Please select or enter...",
}) {
  const [fieldValue, setFieldValue] = React.useState(null);

  return (
    <Autocomplete
      freeSolo
      id={_.kebabCase(label)}
      size="small"
      style={{width: width}}
      options={options}
      value={fieldValue}
      getOptionLabel={(option) => option}
      renderValue={(option, getItemProps) => {
        console.log(_.kebabCase(label), 'renderValue', option);
        return <Chip size="small" label={option} {...getItemProps()} />;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={label}
          placeholder={placeholder}
          slotProps={{
            inputLabel: {shrink: true}, // ✅ label 始终显示
          }}
        />
      )}
      slotProps={{
        listbox: {
          style: {
            maxHeight: 400, // ✅ 下拉框一次能显示更多
          },
        },
      }}
      onChange={(event, newValue) => {
        setFieldValue(newValue);
        if (updateHandler) {
          updateHandler(newValue);
        }
      }}
    />
  );
}

export function TagFieldGroupSingle({
  label = "",
  options = [],
  updateHandler,
  width = 300,
  placeholder = "Please select or enter...",
}) {
  const GroupHeader = styled('div')(({theme}) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: '#000',
    backgroundColor: lighten('rgba(2,71,244,0.74)', 0.85),
    ...theme.applyStyles('dark', {
      color: '#fff',
      backgroundColor: darken('#000', 0.8),
    }),
  }));

  const GroupItems = styled('ul')({
    padding: 0,
  });

  const [fieldValues, setFieldValues] = React.useState([]);


  return (
    <Autocomplete multiple
                  disableCloseOnSelect  // 因为多选，选择后不关闭
                  limitTags={1}
                  freeSolo  // 支持用户输入，输入内容为 string 类型，所有 option 处理需要考虑单纯 string 的情况
                  id={_.kebabCase(label)}
                  size="small"
                  sx={{width: width}}
                  options={options}
                  slotProps={{
                    listbox: {
                      style: {
                        maxHeight: 400, // ✅ 下拉框一次能显示更多
                      },
                    },
                  }}
                  groupBy={(option) => option.group}
                  renderGroup={(params) => (
                    <li key={params.key}>
                      {params.group !== '' && <GroupHeader>{params.group}</GroupHeader>}
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                  getOptionLabel={(option) => typeof option === 'string' ? option : (option.name)}
                  renderOption={(props, option, {selected}) => {  // selected: boolean - 当前选项是否被选中
                    const {key, ...optionProps} = props;          // - **`key`**：React 的唯一标识符，用于 diff 算法优化

                    // 处理对象类型（预定义选项）
                    return (
                      <li key={key} {...optionProps} style={{padding: '8px 12px'}}>
                        <div>
                          <div style={{fontSize: '14px', fontWeight: 500}}>
                            {option.name}
                          </div>
                          {option.description && (
                            <div style={{
                              fontSize: '12px',
                              color: '#666',
                              marginTop: '2px',
                              lineHeight: '1.3'
                            }}>
                              {option.description}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  }}
                  renderInput={(params) => <TextField {...params}
                                                      label={label}
                                                      placeholder={placeholder}
                                                      slotProps={{
                                                        inputLabel: {shrink: true}, // ✅ label 始终显示
                                                      }}
                  />}
                  value={fieldValues || []} // 选中 Options, 可以是预配置的 Option 或者主动输入的 string
                  isOptionEqualToValue={(option, value) => {      // 配置 multiple 时必须？点击 option 时调用。比较 option 和 value，所以考虑所有可能
                    console.log(_.kebabCase(label), 'isOptionEqualToValue', option, value);
                    // 处理字符串类型（用户输入）
                    if (typeof option === 'string' && typeof value === 'string') {
                      return option === value;
                    }
                    // 处理对象类型（从选项中选择）
                    if (typeof option === 'object' && typeof value === 'object') {
                      return option.name === value.name;
                    }
                    // 处理混合类型
                    const optionName = typeof option === 'string' ? option : option.name;
                    const valueName = typeof value === 'string' ? value : value.name;
                    return optionName === valueName;
                  }}
                  onChange={(_e, values) => {  // values：完整的选中数组，更新完 state 后，react 会更新下拉列表选中状态。
                    console.log(_.kebabCase(label), 'onChange', values);

                    // Filter to allow only one option per group
                    const groupDistinctValues = [];
                    const groupsUsed = new Set();

                    // Process values in reverse order to keep the most recently selected option per group
                    for (let i = values.length - 1; i >= 0; i--) {
                      const value = values[i];
                      const group = typeof value === 'string' ? 'custom' : value.group;

                      if (!groupsUsed.has(group)) {
                        groupDistinctValues.unshift(value); // Add to beginning to maintain order
                        groupsUsed.add(group);
                      }
                    }

                    // Update both the filtered values and the text classes
                    setFieldValues(groupDistinctValues);
                    updateHandler(groupDistinctValues);
                  }}
    />
  );
}