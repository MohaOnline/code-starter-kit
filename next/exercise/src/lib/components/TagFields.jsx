import * as React from "react";
import {Autocomplete, TextField, Chip} from "@mui/material";
import _ from "lodash";

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