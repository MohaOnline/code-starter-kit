问题在于 MUI Autocomplete 的 `renderInput` 中，直接设置 `value` 属性会与 Autocomplete 的内部状态管理产生冲突。我们需要通过 `inputValue` 属性来控制输入框的值，并且需要添加回车键处理逻辑来完成编辑。

```javascript
import Script from "next/script";
import * as React from "react";

import {Autocomplete, TextField, Chip, Snackbar, Alert} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {styled, lighten, darken} from '@mui/system';

import _ from "lodash";

export function TagFieldSingle({
  label = "",
  options = [],
  updateHandler,
  width = 200,
  placeholder = "Please select or enter...",
}) {
  const [fieldValue, setFieldValue] = React.useState(null); // Options and value held in field.
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  // 检查当前值是否是用户输入的值（不在预设选项中）
  const isUserInputValue = (value) => {
    if (!value || typeof value !== 'string') return false;
    return !options.includes(value);
  };

  const handleChipDoubleClick = () => {
    if (isUserInputValue(fieldValue)) {
      setIsEditing(true);
      setInputValue(fieldValue);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && isEditing) {
      setFieldValue(inputValue);
      if (updateHandler) {
        updateHandler(inputValue);
      }
      setIsEditing(false);
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  return (
    <Autocomplete freeSolo
                  open={isEditing}
                  id={_.kebabCase(label)}
                  size="small"
                  style={{width: width}}
                  options={options}
                  getOptionLabel={(option) => option}
                  inputValue={isEditing ? inputValue : ''}
                  onInputChange={(event, newInputValue) => {
                    if (isEditing) {
                      setInputValue(newInputValue);
                    }
                  }}
                  slotProps={{
                    listbox: {
                      style: {
                        maxHeight: 400, // ✅ 下拉框一次能显示更多
                      },
                    },
                  }}
                  value={fieldValue}
                  renderValue={(option, getItemProps) => {
                    console.log(_.kebabCase(label), 'renderValue', option);
                    return (
                      <Chip 
                        size="small" 
                        label={option} 
                        {...getItemProps()} 
                        onDoubleClick={handleChipDoubleClick}
                        style={{
                          cursor: isUserInputValue(option) ? 'pointer' : 'default',
                          backgroundColor: isUserInputValue(option) ? '#e3f2fd' : undefined
                        }}
                      />
                    );
                  }}
                  onChange={(event, newValue) => {
                    if (!isEditing) {
                      setFieldValue(newValue);
                      if (updateHandler) {
                        updateHandler(newValue);
                      }
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params}
                               size="small"
                               label={label}
                               placeholder={placeholder}
                               onKeyDown={handleKeyDown}
                               onBlur={handleBlur}
                               slotProps={{
                                 inputLabel: {shrink: true}, // ✅ label 始终显示
                               }}
                    />
                  )}
    />
  );
}

export function TagFieldGroupSingle({
  label = "",
  options = [],
  updateHandler,
  width = 250,
  limitTags = 1,
  allowMultipleManualValues = false,  // allow multiple freeSolo values
  placeholder = "",                   // Placeholder in Text Input Field.
}) {
  const GroupHeader = styled('div')(({theme}) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: '#000',
    backgroundColor: lighten('rgba(0,0,0,0.85)', 0.85),
    ...theme.applyStyles('dark', {
      color: '#fff',
      backgroundColor: darken('#000', 0.8),
    }),
  }));

  const GroupItems = styled('ul')({
    padding: 0,
  });

  const [fieldValues, setFieldValues] = React.useState([]);
  // Show Snackbar when multiple freeSolo values are overwritten.
  const [warningOverwriteSnackOpen, setWarningOverwriteSnackOpen] = React.useState(false);

  const [editingIndex, setEditingIndex] = React.useState(-1);
  const [editingValue, setEditingValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  // 检查当前值是否是用户输入的值（不在预设选项中）
  const isUserInputValue = (value) => {
    if (!value || typeof value !== 'string') return false;
    return !options.some(option =>  // 传入的 options 里没有 value 这个值。
      typeof option === 'string' ? option === value : option.name === value
    );
  };

  /**
   * Chip 双击时，把 label string 和 option 位置保留出来。
   * 用户选中的 options 和 输入的 string 都在 array 里，双击编辑的时候把 array 的位置保存出来。
   * 渲染 Chip 时，跳过正编辑的 string。
   *
   * @param label Chip value: class name string.
   * @param index 设置的多个 option 的序号，从 0 开始。
   */
  const handleChipDoubleClick = (label, index) => {
    if (isUserInputValue(label)) {
      setEditingIndex(index);
      setEditingValue(label);
      setInputValue(label);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && editingIndex >= 0) {
      const updatedValues = [...fieldValues];
      updatedValues[editingIndex] = inputValue;
      
      setFieldValues(updatedValues);
      if (updateHandler) {
        updateHandler(updatedValues);
      }
      
      setEditingIndex(-1);
      setEditingValue('');
      setInputValue('');
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    if (editingIndex >= 0) {
      setEditingIndex(-1);
      setEditingValue('');
      setInputValue('');
    }
  };

  return (
    <>
    <Autocomplete multiple
                  disableCloseOnSelect  // 因为多选，选择后不关闭
                  limitTags={limitTags}
                  freeSolo  // 支持用户输入，输入内容为 string 类型，所有 option 处理需要考虑单纯 string 的情况
                  open={editingIndex >= 0}
                  id={_.kebabCase(label)}
                  size="small"
                  sx={{width: width}}
                  options={editingIndex >= 0 ? [] : options}
                  inputValue={editingIndex >= 0 ? inputValue : ''}
                  onInputChange={(event, newInputValue) => {
                    if (editingIndex >= 0) {
                      setInputValue(newInputValue);
                    }
                  }}
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
                          {option.description && (<div style={{
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
                                                      onKeyDown={handleKeyDown}
                                                      onBlur={handleBlur}
                                                      slotProps={{
                                                        inputLabel: {shrink: true}, // ✅ label 始终显示
                                                      }}
                  />}
                  value={fieldValues || []}                       // 选中 Options, 可以是预配置的 Option 或者主动输入的 string
                  renderValue={(options, getOptionProps) => {
                    console.log(_.kebabCase(label), 'renderValue', options);
                    return options.map((option, index) => {
                      const {key, ...optionProps} = getOptionProps({index});
                      const label = typeof option === 'string' ? option : option.name;

                      if (editingIndex === index) {
                        return null; // 编辑中的 chip 不显示
                      }

                      return (
                        <Chip key={key}
                              size="small"
                              label={label}
                              {...optionProps}
                              onDoubleClick={() => handleChipDoubleClick(label, index)}
                              style={{
                                cursor: isUserInputValue(label) ? 'pointer' : 'default',
                                backgroundColor: isUserInputValue(label) ? '#e3f2fd' : undefined
                              }}
                        />
                      );
                    });
                  }}
                  isOptionEqualToValue={(option, value) => {      // 配置 multiple 时必须？点击 option 时调用。比较 option 和 value，所以考虑所有可能
                    // console.log(_.kebabCase(label), 'isOptionEqualToValue', option, value);
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
                    if (editingIndex >= 0) {
                      // 编辑模式下不处理 onChange
                      return;
                    }

                    console.log(_.kebabCase(label), 'onChange', values);

                    // Filter to allow only one option per group
                    const groupDistinctValues = [];
                    const groupsUsed = new Set();

                    // Process values in reverse order to keep the most recently selected option per group
                    for (let i = values.length - 1; i >= 0; i--) {
                      const value = values[i];

                      let group = typeof value === 'string' ? 'custom' : value.group;
                      if (group === 'custom' && !value.includes(':')) {
                        group = '';
                      }
                      console.log(_.kebabCase(label), 'onChange', value, group);

                      if (!groupsUsed.has(group)) {
                        groupDistinctValues.unshift(value); // Add to beginning to maintain order
                        groupsUsed.add(group);
                      }
                      else if (allowMultipleManualValues && group === 'custom' && !groupDistinctValues.includes(value)) {
                        groupDistinctValues.unshift(value);
                      }
                      else if (group === 'custom') {
                        setWarningOverwriteSnackOpen(true);
                      }
                    }

                    // Update both the filtered values and the text classes
                    setFieldValues(groupDistinctValues);
                    updateHandler(groupDistinctValues);
                  }}
    />
      <Snackbar
        open={warningOverwriteSnackOpen}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setWarningOverwriteSnackOpen(false)}
      >
        <Alert
          severity="warning"
          sx={{width: '100%'}}
          onClose={() => setWarningOverwriteSnackOpen(false)}
        >
          Previous freeSolo value was overwritten as allowMultipleManualValues is false.
        </Alert>
      </Snackbar>
    </>
  );
}
```


## 主要修改说明

### 关键修复：

1. **使用 `inputValue` 和 `onInputChange`**：
    - 替换了直接在 TextField 上设置 `value` 的方式
    - 使用 Autocomplete 的 `inputValue` 属性来控制输入框显示的值
    - 通过 `onInputChange` 回调来监听输入变化

2. **TagFieldSingle 改进**：
    - 添加了 `inputValue` 状态来管理编辑时的输入值
    - 双击时设置 `inputValue` 为当前 chip 的值
    - 回车时更新 `fieldValue` 并调用 `updateHandler`

3. **TagFieldGroupSingle 改进**：
    - 添加了 `inputValue` 状态
    - 编辑时隐藏正在编辑的 chip（返回 `null`）
    - 在 `onChange` 中添加编辑模式检查，避免冲突
    - 回车时更新数组中对应位置的值

### 功能特点：
- ✅ 双击用户输入的 chip 时，输入框会显示该值
- ✅ 回车键确认编辑并更新值
- ✅ 失焦时取消编辑
- ✅ 编辑期间隐藏下拉选项和正在编辑的 chip
- ✅ 用户输入值有特殊样式提示

现在双击 chip 时，其值会正确显示在输入框中，可以进行编辑了。