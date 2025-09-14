'use client'

import React, {useMemo} from 'react';
import {ThemeProvider as NextThemeProvider, useTheme as useNextTheme, type ThemeProviderProps} from 'next-themes'
import {ThemeProvider as MuiThemeProvider, createTheme, CssBaseline} from '@mui/material';

function MuiThemeAdapter({children}: { children: React.ReactNode }) {
  const {resolvedTheme} = useNextTheme();
  const mode = (resolvedTheme === 'dark' || resolvedTheme === 'light') ? resolvedTheme : 'light';

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode,
      text: {
        primary: 'var(--foreground)',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // 确保默认文字颜色使用你的变量（覆盖 CssBaseline 默认颜色）
            color: 'var(--foreground)',
          },
        },
      },
    },

  }), [mode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline/>
      {children}
    </MuiThemeProvider>
  );
}

export function NextThemesProvider({children, ...props}) {
  return (
    <NextThemeProvider {...props}>
      <MuiThemeAdapter>
        {children}
      </MuiThemeAdapter>
    </NextThemeProvider>
  );
}
