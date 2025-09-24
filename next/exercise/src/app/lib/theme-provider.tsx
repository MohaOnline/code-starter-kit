'use client'

import React, {useMemo} from 'react';
import {ThemeProvider as NextThemeProvider, useTheme as useNextTheme, type ThemeProviderProps} from 'next-themes'
import {ThemeProvider as MuiThemeProvider, createTheme, CssBaseline} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';


function MuiThemeAdapter({children}: { children: React.ReactNode }) {
  const {resolvedTheme} = useNextTheme();
  const mode = (resolvedTheme === 'dark' || resolvedTheme === 'light') ? resolvedTheme : 'light';

  // @see https://mui.com/material-ui/customization/palette/#values
  // @see https://mui.com/material-ui/integrations/nextjs/#configuration Next JS 水合问题方案
  // Material 默认颜色 https://mui.com/material-ui/customization/default-theme/ 切换 dark theme 可以看到所有颜色默认值。
  const muiTheme = useMemo(() => createTheme({
    // 参考该文档实现 Material UI Theme 和 Next Theme 的 mode 一致。
    // https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually
    colorSchemes: {light: true, dark: true},
    cssVariables: {
      colorSchemeSelector: 'class'
    },
    palette: {
      text: {
        // primary: mode === 'dark' ? 'rgb(120,210,120)' : '#000',
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
    // <AppRouterCacheProvider options={{enableCssLayer: true}}>
    <NextThemeProvider enableSystem={true} {...props}>
      <MuiThemeAdapter>
        {children}
      </MuiThemeAdapter>
    </NextThemeProvider>
    // </AppRouterCacheProvider>
  );
}
