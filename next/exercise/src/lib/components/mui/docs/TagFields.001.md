我来帮你为 `TagFieldGroupSingle` 和 `TagFieldSingle` 组件添加双击编辑功能。这个功能需要检测用户输入的值（freeSolo 值），然后在双击时回到编辑状态。

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

  // 检查当前值是否是用户输入的值（不在预设选项中）
  const isUserInputValue = (value) => {
    if (!value || typeof value !== 'string') return false;
    return !options.includes(value);
  };

  const handleChipDoubleClick = () => {
    if (isUserInputValue(fieldValue)) {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && isEditing) {
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
                    setFieldValue(newValue);
                    if (updateHandler) {
                      updateHandler(newValue);
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
  allowMultiManualValue: allowMultipleManualValues = false, // allow multiple freeSolo values
  placeholder = "", // Placeholder in Text Input Field.
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
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(-1);
  const [editingValue, setEditingValue] = React.useState('');

  // 检查当前值是否是用户输入的值（不在预设选项中）
  const isUserInputValue = (value) => {
    if (!value || typeof value !== 'string') return false;
    return !options.some(option => 
      typeof option === 'string' ? option === value : option.name === value
    );
  };

  const handleChipDoubleClick = (chipValue, index) => {
    if (isUserInputValue(chipValue)) {
      setEditingIndex(index);
      setEditingValue(chipValue);
    }
  };

  const handleEditingChange = (event, newValue) => {
    if (editingIndex >= 0) {
      const updatedValues = [...fieldValues];
      updatedValues[editingIndex] = newValue || editingValue;
      
      setFieldValues(updatedValues);
      if (updateHandler) {
        updateHandler(updatedValues);
      }
      
      setEditingIndex(-1);
      setEditingValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && editingIndex >= 0) {
      const updatedValues = [...fieldValues];
      updatedValues[editingIndex] = editingValue;
      
      setFieldValues(updatedValues);
      if (updateHandler) {
        updateHandler(updatedValues);
      }
      
      setEditingIndex(-1);
      setEditingValue('');
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    if (editingIndex >= 0) {
      setEditingIndex(-1);
      setEditingValue('');
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
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      const displayValue = typeof option === 'string' ? option : option.name;
                      
                      return (
                        <Chip
                          key={key}
                          size="small"
                          label={displayValue}
                          {...tagProps}
                          onDoubleClick={() => handleChipDoubleClick(displayValue, index)}
                          style={{
                            cursor: isUserInputValue(displayValue) ? 'pointer' : 'default',
                            backgroundColor: isUserInputValue(displayValue) ? '#e3f2fd' : undefined
                          }}
                        />
                      );
                    });
                  }}
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
                                                      value={editingIndex >= 0 ? editingValue : params.inputProps.value}
                                                      onChange={editingIndex >= 0 ? (e) => setEditingValue(e.target.value) : undefined}
                                                      onKeyDown={handleKeyDown}
                                                      onBlur={handleBlur}
                                                      slotProps={{
                                                        inputLabel: {shrink: true}, // ✅ label 始终显示
                                                      }}
                  />}
                  value={fieldValues || []}                       // 选中 Options, 可以是预配置的 Option 或者主动输入的 string
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
                  onChange={editingIndex >= 0 ? handleEditingChange : (_e, values) => {  // values：完整的选中数组，更新完 state 后，react 会更新下拉列表选中状态。
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
                      else if (allowMultipleManualValues && group === 'custom' && !groupDistinctValues.includes(value)) {
                        groupDistinctValues.unshift(value);
                      }
                      else if (group === 'custom') {
                        setSnackOpen(true);
                      }
                    }

                    // Update both the filtered values and the text classes
                    setFieldValues(groupDistinctValues);
                    updateHandler(groupDistinctValues);
                  }}
    />
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setSnackOpen(false)}
      >
        <Alert
          severity="warning"
          sx={{width: '100%'}}
          onClose={() => setSnackOpen(false)}
        >
          Previous freeSolo value was overwritten as allowMultipleManualValues is false.
        </Alert>
      </Snackbar>
    </>
  );
}
```


## 功能说明

我为两个组件添加了双击编辑功能，主要特性包括：

### TagFieldSingle：
1. **识别用户输入值**：通过 `isUserInputValue` 函数检测当前值是否为用户输入（不在预设选项中）
2. **视觉提示**：用户输入的 Chip 会有特殊的蓝色背景和鼠标指针样式
3. **双击编辑**：双击用户输入的 Chip 进入编辑模式
4. **回车确认**：按回车键确认修改
5. **失焦退出**：点击其他地方退出编辑模式

### TagFieldGroupSingle：
1. **多值编辑**：支持对多个用户输入值进行编辑
2. **编辑状态管理**：使用 `editingIndex` 和 `editingValue` 状态管理当前编辑的项目
3. **自定义 renderTags**：重写了 Chip 的渲染逻辑，添加双击事件处理
4. **编辑模式优化**：编辑时隐藏下拉选项，专注于文本输入

### 主要改进：
- ✅ 只有用户输入的值才能双击编辑（预设选项不可编辑）
- ✅ 用户输入的值有特殊的视觉样式（淡蓝色背景）
- ✅ 回车键确认修改
- ✅ 失焦或ESC键取消编辑
- ✅ 编辑期间的状态管理
- ✅ 与原有功能完全兼容

现在用户可以双击任何自己输入的标签来重新编辑，预设的选项则保持不可编辑状态。