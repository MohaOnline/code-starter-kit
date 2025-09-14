'use client';

import {Autocomplete, TextField} from "@mui/material";

// @see /examples/mui/7/autocompelete/virtual/v02
export default function Page() {

  function random(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  const OPTIONS = Array.from(new Array(10000))
                       .map(() => random(10 + Math.ceil(Math.random() * 20)))
                       .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
  console.log(OPTIONS);

  return (
    <>
      hello
      <Autocomplete options={OPTIONS}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Movie"/>}
      />
    </>
  );
}
