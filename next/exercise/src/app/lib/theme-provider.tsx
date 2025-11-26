'use client'

import React, {useMemo} from 'react';
import {ThemeProvider as NextThemeProvider, useTheme as useNextTheme, type ThemeProviderProps} from 'next-themes'
import {ThemeProvider as MuiThemeProvider, createTheme, CssBaseline, useColorScheme} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {CssVarsProvider} from '@mui/material/styles';


function MuiThemeAdapter({children}: { children: React.ReactNode }) {
  const {resolvedTheme} = useNextTheme();
  const mode = (resolvedTheme === 'dark' || resolvedTheme === 'light') ? resolvedTheme : 'light';

  // @see https://mui.com/material-ui/customization/palette/#values
  // @see https://mui.com/material-ui/integrations/nextjs/#configuration Next JS 水合问题方案
  // Material 默认颜色 https://mui.com/material-ui/customization/default-theme/ 切换 dark theme 可以看到所有颜色默认值。
  const muiTheme = useMemo(() => createTheme({
    // 参考该文档实现 Material UI Theme 和 Next Theme 的 mode 一致。
    // https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually
    colorSchemes: {
      // light: true,
      dark:  {
        palette: {
          text: {
            primary: 'rgb(120,210,120)',
          },
        },
      }
    },
    cssVariables: {
      colorSchemeSelector: 'class', // MUI 如何确定
    },
    typography: {
      // 使用系统字体替代 Roboto，避免 Edge 字体渲染问题
      fontFamily: [
        '"Chinese Quotes"',
        '"PingFang SC"',
        'SimHei',
        'Helvetica',
        'SimSun',
        '"宋体"',
        '"微软雅黑"',
        '"Microsoft YaHei"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif',
      ].join(','),
      // 调整默认字重，使其在 Edge 中显示更细
    //   fontWeightLight: 300,
    //   fontWeightRegular: 350,  // 从 400 降低到 350
    //   fontWeightMedium: 450,   // 从 500 降低到 450
    //   fontWeightBold: 600,     // 从 700 降低到 600
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // 确保默认文字颜色使用你的变量（覆盖 CssBaseline 默认颜色）
            color: 'var(--foreground)',
            backgroundColor: 'var(--background)',
          },
        },
      },
      MuiInputLabel:  {
        styleOverrides: {
          root: ({theme}) => ({
            color:           'var(--foreground)',
            backgroundColor: 'var(--background)',
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({theme}) => {
            // console.log('theme-provider', theme);   // theme 是把当前主题所有配置内容传回
            /* log content:
{
    "defaultColorScheme": "light",
    "breakpoints": {
        "keys": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
        ],
        "values": {
            "xs": 0,
            "sm": 600,
            "md": 900,
            "lg": 1200,
            "xl": 1536
        },
        "unit": "px"
    },
    "direction": "ltr",
    "components": {
        "MuiCssBaseline": {
            "styleOverrides": {
                "body": {
                    "color": "var(--foreground)",
                    "backgroundColor": "var(--background)"
                }
            }
        },
        "MuiInputLabel": {
            "styleOverrides": {}
        },
        "MuiIconButton": {
            "styleOverrides": {}
        }
    },
    "shape": {
        "borderRadius": 4
    },
    "unstable_sxConfig": {
        "border": {
            "themeKey": "borders"
        },
        "borderTop": {
            "themeKey": "borders"
        },
        "borderRight": {
            "themeKey": "borders"
        },
        "borderBottom": {
            "themeKey": "borders"
        },
        "borderLeft": {
            "themeKey": "borders"
        },
        "borderColor": {
            "themeKey": "palette"
        },
        "borderTopColor": {
            "themeKey": "palette"
        },
        "borderRightColor": {
            "themeKey": "palette"
        },
        "borderBottomColor": {
            "themeKey": "palette"
        },
        "borderLeftColor": {
            "themeKey": "palette"
        },
        "outline": {
            "themeKey": "borders"
        },
        "outlineColor": {
            "themeKey": "palette"
        },
        "borderRadius": {
            "themeKey": "shape.borderRadius"
        },
        "color": {
            "themeKey": "palette"
        },
        "bgcolor": {
            "themeKey": "palette",
            "cssProperty": "backgroundColor"
        },
        "backgroundColor": {
            "themeKey": "palette"
        },
        "p": {},
        "pt": {},
        "pr": {},
        "pb": {},
        "pl": {},
        "px": {},
        "py": {},
        "padding": {},
        "paddingTop": {},
        "paddingRight": {},
        "paddingBottom": {},
        "paddingLeft": {},
        "paddingX": {},
        "paddingY": {},
        "paddingInline": {},
        "paddingInlineStart": {},
        "paddingInlineEnd": {},
        "paddingBlock": {},
        "paddingBlockStart": {},
        "paddingBlockEnd": {},
        "m": {},
        "mt": {},
        "mr": {},
        "mb": {},
        "ml": {},
        "mx": {},
        "my": {},
        "margin": {},
        "marginTop": {},
        "marginRight": {},
        "marginBottom": {},
        "marginLeft": {},
        "marginX": {},
        "marginY": {},
        "marginInline": {},
        "marginInlineStart": {},
        "marginInlineEnd": {},
        "marginBlock": {},
        "marginBlockStart": {},
        "marginBlockEnd": {},
        "displayPrint": {
            "cssProperty": false
        },
        "display": {},
        "overflow": {},
        "textOverflow": {},
        "visibility": {},
        "whiteSpace": {},
        "flexBasis": {},
        "flexDirection": {},
        "flexWrap": {},
        "justifyContent": {},
        "alignItems": {},
        "alignContent": {},
        "order": {},
        "flex": {},
        "flexGrow": {},
        "flexShrink": {},
        "alignSelf": {},
        "justifyItems": {},
        "justifySelf": {},
        "gap": {},
        "rowGap": {},
        "columnGap": {},
        "gridColumn": {},
        "gridRow": {},
        "gridAutoFlow": {},
        "gridAutoColumns": {},
        "gridAutoRows": {},
        "gridTemplateColumns": {},
        "gridTemplateRows": {},
        "gridTemplateAreas": {},
        "gridArea": {},
        "position": {},
        "zIndex": {
            "themeKey": "zIndex"
        },
        "top": {},
        "right": {},
        "bottom": {},
        "left": {},
        "boxShadow": {
            "themeKey": "shadows"
        },
        "width": {},
        "maxWidth": {},
        "minWidth": {},
        "height": {},
        "maxHeight": {},
        "minHeight": {},
        "boxSizing": {},
        "font": {
            "themeKey": "font"
        },
        "fontFamily": {
            "themeKey": "typography"
        },
        "fontSize": {
            "themeKey": "typography"
        },
        "fontStyle": {
            "themeKey": "typography"
        },
        "fontWeight": {
            "themeKey": "typography"
        },
        "letterSpacing": {},
        "textTransform": {},
        "lineHeight": {},
        "textAlign": {},
        "typography": {
            "cssProperty": false,
            "themeKey": "typography"
        }
    },
    "mixins": {
        "toolbar": {
            "minHeight": 56,
            "@media (min-width:0px)": {
                "@media (orientation: landscape)": {
                    "minHeight": 48
                }
            },
            "@media (min-width:600px)": {
                "minHeight": 64
            }
        }
    },
    "shadows": [
        "none",
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
        "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
        "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
        "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
        "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
        "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
        "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
        "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
        "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
        "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
    ],
    "typography": {
        "htmlFontSize": 16,
        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        "fontWeightBold": 700,
        "h1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "6rem",
            "lineHeight": 1.167,
            "letterSpacing": "-0.01562em"
        },
        "h2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 300,
            "fontSize": "3.75rem",
            "lineHeight": 1.2,
            "letterSpacing": "-0.00833em"
        },
        "h3": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "3rem",
            "lineHeight": 1.167,
            "letterSpacing": "0em"
        },
        "h4": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "2.125rem",
            "lineHeight": 1.235,
            "letterSpacing": "0.00735em"
        },
        "h5": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1.5rem",
            "lineHeight": 1.334,
            "letterSpacing": "0em"
        },
        "h6": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "1.25rem",
            "lineHeight": 1.6,
            "letterSpacing": "0.0075em"
        },
        "subtitle1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.00938em"
        },
        "subtitle2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.57,
            "letterSpacing": "0.00714em"
        },
        "body1": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "1rem",
            "lineHeight": 1.5,
            "letterSpacing": "0.00938em"
        },
        "body2": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.875rem",
            "lineHeight": 1.43,
            "letterSpacing": "0.01071em"
        },
        "button": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 500,
            "fontSize": "0.875rem",
            "lineHeight": 1.75,
            "letterSpacing": "0.02857em",
            "textTransform": "uppercase"
        },
        "caption": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 1.66,
            "letterSpacing": "0.03333em"
        },
        "overline": {
            "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            "fontWeight": 400,
            "fontSize": "0.75rem",
            "lineHeight": 2.66,
            "letterSpacing": "0.08333em",
            "textTransform": "uppercase"
        },
        "inherit": {
            "fontFamily": "inherit",
            "fontWeight": "inherit",
            "fontSize": "inherit",
            "lineHeight": "inherit",
            "letterSpacing": "inherit"
        }
    },
    "transitions": {
        "easing": {
            "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
            "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
            "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
            "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
        },
        "duration": {
            "shortest": 150,
            "shorter": 200,
            "short": 250,
            "standard": 300,
            "complex": 375,
            "enteringScreen": 225,
            "leavingScreen": 195
        }
    },
    "zIndex": {
        "mobileStepper": 1000,
        "fab": 1050,
        "speedDial": 1050,
        "appBar": 1100,
        "drawer": 1200,
        "modal": 1300,
        "snackbar": 1400,
        "tooltip": 1500
    },
    "cssVarPrefix": "mui",
    "colorSchemeSelector": "class",
    "rootSelector": ":root",
    "colorSchemes": {
        "light": {
            "palette": {
                "mode": "light",
                "common": {
                    "black": "#000",
                    "white": "#fff",
                    "background": "#fff",
                    "onBackground": "#000",
                    "backgroundChannel": "255 255 255",
                    "onBackgroundChannel": "0 0 0"
                },
                "primary": {
                    "main": "#1976d2",
                    "light": "#42a5f5",
                    "dark": "#1565c0",
                    "contrastText": "#fff",
                    "mainChannel": "25 118 210",
                    "lightChannel": "66 165 245",
                    "darkChannel": "21 101 192",
                    "contrastTextChannel": "255 255 255"
                },
                "secondary": {
                    "main": "#9c27b0",
                    "light": "#ba68c8",
                    "dark": "#7b1fa2",
                    "contrastText": "#fff",
                    "mainChannel": "156 39 176",
                    "lightChannel": "186 104 200",
                    "darkChannel": "123 31 162",
                    "contrastTextChannel": "255 255 255"
                },
                "error": {
                    "main": "#d32f2f",
                    "light": "#ef5350",
                    "dark": "#c62828",
                    "contrastText": "#fff",
                    "mainChannel": "211 47 47",
                    "lightChannel": "239 83 80",
                    "darkChannel": "198 40 40",
                    "contrastTextChannel": "255 255 255"
                },
                "warning": {
                    "main": "#ed6c02",
                    "light": "#ff9800",
                    "dark": "#e65100",
                    "contrastText": "#fff",
                    "mainChannel": "237 108 2",
                    "lightChannel": "255 152 0",
                    "darkChannel": "230 81 0",
                    "contrastTextChannel": "255 255 255"
                },
                "info": {
                    "main": "#0288d1",
                    "light": "#03a9f4",
                    "dark": "#01579b",
                    "contrastText": "#fff",
                    "mainChannel": "2 136 209",
                    "lightChannel": "3 169 244",
                    "darkChannel": "1 87 155",
                    "contrastTextChannel": "255 255 255"
                },
                "success": {
                    "main": "#2e7d32",
                    "light": "#4caf50",
                    "dark": "#1b5e20",
                    "contrastText": "#fff",
                    "mainChannel": "46 125 50",
                    "lightChannel": "76 175 80",
                    "darkChannel": "27 94 32",
                    "contrastTextChannel": "255 255 255"
                },
                "grey": {
                    "50": "#fafafa",
                    "100": "#f5f5f5",
                    "200": "#eeeeee",
                    "300": "#e0e0e0",
                    "400": "#bdbdbd",
                    "500": "#9e9e9e",
                    "600": "#757575",
                    "700": "#616161",
                    "800": "#424242",
                    "900": "#212121",
                    "A100": "#f5f5f5",
                    "A200": "#eeeeee",
                    "A400": "#bdbdbd",
                    "A700": "#616161"
                },
                "contrastThreshold": 3,
                "tonalOffset": 0.2,
                "text": {
                    "primary": "rgba(0, 0, 0, 0.87)",
                    "secondary": "rgba(0, 0, 0, 0.6)",
                    "disabled": "rgba(0, 0, 0, 0.38)",
                    "primaryChannel": "0 0 0",
                    "secondaryChannel": "0 0 0"
                },
                "divider": "rgba(0, 0, 0, 0.12)",
                "background": {
                    "paper": "#fff",
                    "default": "#fff",
                    "defaultChannel": "255 255 255",
                    "paperChannel": "255 255 255"
                },
                "action": {
                    "active": "rgba(0, 0, 0, 0.54)",
                    "hover": "rgba(0, 0, 0, 0.04)",
                    "hoverOpacity": 0.04,
                    "selected": "rgba(0, 0, 0, 0.08)",
                    "selectedOpacity": 0.08,
                    "disabled": "rgba(0, 0, 0, 0.26)",
                    "disabledBackground": "rgba(0, 0, 0, 0.12)",
                    "disabledOpacity": 0.38,
                    "focus": "rgba(0, 0, 0, 0.12)",
                    "focusOpacity": 0.12,
                    "activatedOpacity": 0.12,
                    "activeChannel": "0 0 0",
                    "selectedChannel": "0 0 0"
                },
                "Alert": {
                    "errorColor": "rgb(95, 33, 32)",
                    "infoColor": "rgb(1, 67, 97)",
                    "successColor": "rgb(30, 70, 32)",
                    "warningColor": "rgb(102, 60, 0)",
                    "errorFilledBg": "var(--mui-palette-error-main, #d32f2f)",
                    "infoFilledBg": "var(--mui-palette-info-main, #0288d1)",
                    "successFilledBg": "var(--mui-palette-success-main, #2e7d32)",
                    "warningFilledBg": "var(--mui-palette-warning-main, #ed6c02)",
                    "errorFilledColor": "#fff",
                    "infoFilledColor": "#fff",
                    "successFilledColor": "#fff",
                    "warningFilledColor": "#fff",
                    "errorStandardBg": "rgb(253, 237, 237)",
                    "infoStandardBg": "rgb(229, 246, 253)",
                    "successStandardBg": "rgb(237, 247, 237)",
                    "warningStandardBg": "rgb(255, 244, 229)",
                    "errorIconColor": "var(--mui-palette-error-main, #d32f2f)",
                    "infoIconColor": "var(--mui-palette-info-main, #0288d1)",
                    "successIconColor": "var(--mui-palette-success-main, #2e7d32)",
                    "warningIconColor": "var(--mui-palette-warning-main, #ed6c02)"
                },
                "AppBar": {
                    "defaultBg": "var(--mui-palette-grey-100, #f5f5f5)"
                },
                "Avatar": {
                    "defaultBg": "var(--mui-palette-grey-400, #bdbdbd)"
                },
                "Button": {
                    "inheritContainedBg": "var(--mui-palette-grey-300, #e0e0e0)",
                    "inheritContainedHoverBg": "var(--mui-palette-grey-A100, #f5f5f5)"
                },
                "Chip": {
                    "defaultBorder": "var(--mui-palette-grey-400, #bdbdbd)",
                    "defaultAvatarColor": "var(--mui-palette-grey-700, #616161)",
                    "defaultIconColor": "var(--mui-palette-grey-700, #616161)"
                },
                "FilledInput": {
                    "bg": "rgba(0, 0, 0, 0.06)",
                    "hoverBg": "rgba(0, 0, 0, 0.09)",
                    "disabledBg": "rgba(0, 0, 0, 0.12)"
                },
                "LinearProgress": {
                    "primaryBg": "rgb(167, 202, 237)",
                    "secondaryBg": "rgb(217, 172, 224)",
                    "errorBg": "rgb(238, 175, 175)",
                    "infoBg": "rgb(158, 209, 237)",
                    "successBg": "rgb(175, 205, 177)",
                    "warningBg": "rgb(248, 199, 158)"
                },
                "Skeleton": {
                    "bg": "rgba(var(--mui-palette-text-primaryChannel, undefined) / 0.11)"
                },
                "Slider": {
                    "primaryTrack": "rgb(167, 202, 237)",
                    "secondaryTrack": "rgb(217, 172, 224)",
                    "errorTrack": "rgb(238, 175, 175)",
                    "infoTrack": "rgb(158, 209, 237)",
                    "successTrack": "rgb(175, 205, 177)",
                    "warningTrack": "rgb(248, 199, 158)"
                },
                "SnackbarContent": {
                    "bg": "rgb(50, 50, 50)",
                    "color": "#fff"
                },
                "SpeedDialAction": {
                    "fabHoverBg": "rgb(216, 216, 216)"
                },
                "StepConnector": {
                    "border": "var(--mui-palette-grey-400, #bdbdbd)"
                },
                "StepContent": {
                    "border": "var(--mui-palette-grey-400, #bdbdbd)"
                },
                "Switch": {
                    "defaultColor": "var(--mui-palette-common-white, #fff)",
                    "defaultDisabledColor": "var(--mui-palette-grey-100, #f5f5f5)",
                    "primaryDisabledColor": "rgb(167, 202, 237)",
                    "secondaryDisabledColor": "rgb(217, 172, 224)",
                    "errorDisabledColor": "rgb(238, 175, 175)",
                    "infoDisabledColor": "rgb(158, 209, 237)",
                    "successDisabledColor": "rgb(175, 205, 177)",
                    "warningDisabledColor": "rgb(248, 199, 158)"
                },
                "TableCell": {
                    "border": "rgba(224, 224, 224, 1)"
                },
                "Tooltip": {
                    "bg": "rgba(97, 97, 97, 0.92)"
                },
                "dividerChannel": "0 0 0"
            },
            "opacity": {
                "inputPlaceholder": 0.42,
                "inputUnderline": 0.42,
                "switchTrackDisabled": 0.12,
                "switchTrack": 0.38
            },
            "overlays": []
        },
        "dark": {
            "palette": {
                "common": {
                    "black": "#000",
                    "white": "#fff",
                    "background": "#000",
                    "onBackground": "#fff",
                    "backgroundChannel": "0 0 0",
                    "onBackgroundChannel": "255 255 255"
                },
                "mode": "dark",
                "primary": {
                    "main": "#90caf9",
                    "light": "#e3f2fd",
                    "dark": "#42a5f5",
                    "contrastText": "rgba(0, 0, 0, 0.87)",
                    "mainChannel": "144 202 249",
                    "lightChannel": "227 242 253",
                    "darkChannel": "66 165 245",
                    "contrastTextChannel": "0 0 0"
                },
                "secondary": {
                    "main": "#ce93d8",
                    "light": "#f3e5f5",
                    "dark": "#ab47bc",
                    "contrastText": "rgba(0, 0, 0, 0.87)",
                    "mainChannel": "206 147 216",
                    "lightChannel": "243 229 245",
                    "darkChannel": "171 71 188",
                    "contrastTextChannel": "0 0 0"
                },
                "error": {
                    "main": "#f44336",
                    "light": "#e57373",
                    "dark": "#d32f2f",
                    "contrastText": "#fff",
                    "mainChannel": "244 67 54",
                    "lightChannel": "229 115 115",
                    "darkChannel": "211 47 47",
                    "contrastTextChannel": "255 255 255"
                },
                "warning": {
                    "main": "#ffa726",
                    "light": "#ffb74d",
                    "dark": "#f57c00",
                    "contrastText": "rgba(0, 0, 0, 0.87)",
                    "mainChannel": "255 167 38",
                    "lightChannel": "255 183 77",
                    "darkChannel": "245 124 0",
                    "contrastTextChannel": "0 0 0"
                },
                "info": {
                    "main": "#29b6f6",
                    "light": "#4fc3f7",
                    "dark": "#0288d1",
                    "contrastText": "rgba(0, 0, 0, 0.87)",
                    "mainChannel": "41 182 246",
                    "lightChannel": "79 195 247",
                    "darkChannel": "2 136 209",
                    "contrastTextChannel": "0 0 0"
                },
                "success": {
                    "main": "#66bb6a",
                    "light": "#81c784",
                    "dark": "#388e3c",
                    "contrastText": "rgba(0, 0, 0, 0.87)",
                    "mainChannel": "102 187 106",
                    "lightChannel": "129 199 132",
                    "darkChannel": "56 142 60",
                    "contrastTextChannel": "0 0 0"
                },
                "grey": {
                    "50": "#fafafa",
                    "100": "#f5f5f5",
                    "200": "#eeeeee",
                    "300": "#e0e0e0",
                    "400": "#bdbdbd",
                    "500": "#9e9e9e",
                    "600": "#757575",
                    "700": "#616161",
                    "800": "#424242",
                    "900": "#212121",
                    "A100": "#f5f5f5",
                    "A200": "#eeeeee",
                    "A400": "#bdbdbd",
                    "A700": "#616161"
                },
                "contrastThreshold": 3,
                "tonalOffset": 0.2,
                "text": {
                    "primary": "rgb(120,210,120)",
                    "secondary": "rgba(255, 255, 255, 0.7)",
                    "disabled": "rgba(255, 255, 255, 0.5)",
                    "icon": "rgba(255, 255, 255, 0.5)",
                    "primaryChannel": "120 210 120",
                    "secondaryChannel": "255 255 255"
                },
                "divider": "rgba(255, 255, 255, 0.12)",
                "background": {
                    "paper": "#121212",
                    "default": "#121212",
                    "defaultChannel": "18 18 18",
                    "paperChannel": "18 18 18"
                },
                "action": {
                    "active": "#fff",
                    "hover": "rgba(255, 255, 255, 0.08)",
                    "hoverOpacity": 0.08,
                    "selected": "rgba(255, 255, 255, 0.16)",
                    "selectedOpacity": 0.16,
                    "disabled": "rgba(255, 255, 255, 0.3)",
                    "disabledBackground": "rgba(255, 255, 255, 0.12)",
                    "disabledOpacity": 0.38,
                    "focus": "rgba(255, 255, 255, 0.12)",
                    "focusOpacity": 0.12,
                    "activatedOpacity": 0.24,
                    "activeChannel": "255 255 255",
                    "selectedChannel": "255 255 255"
                },
                "Alert": {
                    "errorColor": "rgb(244, 199, 199)",
                    "infoColor": "rgb(184, 231, 251)",
                    "successColor": "rgb(204, 232, 205)",
                    "warningColor": "rgb(255, 226, 183)",
                    "errorFilledBg": "var(--mui-palette-error-dark, #d32f2f)",
                    "infoFilledBg": "var(--mui-palette-info-dark, #0288d1)",
                    "successFilledBg": "var(--mui-palette-success-dark, #388e3c)",
                    "warningFilledBg": "var(--mui-palette-warning-dark, #f57c00)",
                    "errorFilledColor": "#fff",
                    "infoFilledColor": "#fff",
                    "successFilledColor": "#fff",
                    "warningFilledColor": "rgba(0, 0, 0, 0.87)",
                    "errorStandardBg": "rgb(22, 11, 11)",
                    "infoStandardBg": "rgb(7, 19, 24)",
                    "successStandardBg": "rgb(12, 19, 13)",
                    "warningStandardBg": "rgb(25, 18, 7)",
                    "errorIconColor": "var(--mui-palette-error-main, #f44336)",
                    "infoIconColor": "var(--mui-palette-info-main, #29b6f6)",
                    "successIconColor": "var(--mui-palette-success-main, #66bb6a)",
                    "warningIconColor": "var(--mui-palette-warning-main, #ffa726)"
                },
                "AppBar": {
                    "defaultBg": "var(--mui-palette-grey-900, #212121)",
                    "darkBg": "var(--mui-palette-background-paper, #121212)",
                    "darkColor": "var(--mui-palette-text-primary, rgb(120,210,120))"
                },
                "Avatar": {
                    "defaultBg": "var(--mui-palette-grey-600, #757575)"
                },
                "Button": {
                    "inheritContainedBg": "var(--mui-palette-grey-800, #424242)",
                    "inheritContainedHoverBg": "var(--mui-palette-grey-700, #616161)"
                },
                "Chip": {
                    "defaultBorder": "var(--mui-palette-grey-700, #616161)",
                    "defaultAvatarColor": "var(--mui-palette-grey-300, #e0e0e0)",
                    "defaultIconColor": "var(--mui-palette-grey-300, #e0e0e0)"
                },
                "FilledInput": {
                    "bg": "rgba(255, 255, 255, 0.09)",
                    "hoverBg": "rgba(255, 255, 255, 0.13)",
                    "disabledBg": "rgba(255, 255, 255, 0.12)"
                },
                "LinearProgress": {
                    "primaryBg": "rgb(72, 101, 124)",
                    "secondaryBg": "rgb(103, 73, 108)",
                    "errorBg": "rgb(122, 33, 27)",
                    "infoBg": "rgb(20, 91, 123)",
                    "successBg": "rgb(51, 93, 53)",
                    "warningBg": "rgb(127, 83, 19)"
                },
                "Skeleton": {
                    "bg": "rgba(var(--mui-palette-text-primaryChannel, undefined) / 0.13)"
                },
                "Slider": {
                    "primaryTrack": "rgb(72, 101, 124)",
                    "secondaryTrack": "rgb(103, 73, 108)",
                    "errorTrack": "rgb(122, 33, 27)",
                    "infoTrack": "rgb(20, 91, 123)",
                    "successTrack": "rgb(51, 93, 53)",
                    "warningTrack": "rgb(127, 83, 19)"
                },
                "SnackbarContent": {
                    "bg": "rgb(250, 250, 250)",
                    "color": "rgba(0, 0, 0, 0.87)"
                },
                "SpeedDialAction": {
                    "fabHoverBg": "rgb(53, 53, 53)"
                },
                "StepConnector": {
                    "border": "var(--mui-palette-grey-600, #757575)"
                },
                "StepContent": {
                    "border": "var(--mui-palette-grey-600, #757575)"
                },
                "Switch": {
                    "defaultColor": "var(--mui-palette-grey-300, #e0e0e0)",
                    "defaultDisabledColor": "var(--mui-palette-grey-600, #757575)",
                    "primaryDisabledColor": "rgb(64, 90, 112)",
                    "secondaryDisabledColor": "rgb(92, 66, 97)",
                    "errorDisabledColor": "rgb(109, 30, 24)",
                    "infoDisabledColor": "rgb(18, 81, 110)",
                    "successDisabledColor": "rgb(45, 84, 47)",
                    "warningDisabledColor": "rgb(114, 75, 17)"
                },
                "TableCell": {
                    "border": "rgba(81, 81, 81, 1)"
                },
                "Tooltip": {
                    "bg": "rgba(97, 97, 97, 0.92)"
                },
                "dividerChannel": "255 255 255"
            },
            "opacity": {
                "inputPlaceholder": 0.5,
                "inputUnderline": 0.7,
                "switchTrackDisabled": 0.2,
                "switchTrack": 0.3
            },
            "overlays": [
                "none",
                "linear-gradient(rgba(255 255 255 / 0.051), rgba(255 255 255 / 0.051))",
                "linear-gradient(rgba(255 255 255 / 0.069), rgba(255 255 255 / 0.069))",
                "linear-gradient(rgba(255 255 255 / 0.082), rgba(255 255 255 / 0.082))",
                "linear-gradient(rgba(255 255 255 / 0.092), rgba(255 255 255 / 0.092))",
                "linear-gradient(rgba(255 255 255 / 0.101), rgba(255 255 255 / 0.101))",
                "linear-gradient(rgba(255 255 255 / 0.108), rgba(255 255 255 / 0.108))",
                "linear-gradient(rgba(255 255 255 / 0.114), rgba(255 255 255 / 0.114))",
                "linear-gradient(rgba(255 255 255 / 0.119), rgba(255 255 255 / 0.119))",
                "linear-gradient(rgba(255 255 255 / 0.124), rgba(255 255 255 / 0.124))",
                "linear-gradient(rgba(255 255 255 / 0.128), rgba(255 255 255 / 0.128))",
                "linear-gradient(rgba(255 255 255 / 0.132), rgba(255 255 255 / 0.132))",
                "linear-gradient(rgba(255 255 255 / 0.135), rgba(255 255 255 / 0.135))",
                "linear-gradient(rgba(255 255 255 / 0.139), rgba(255 255 255 / 0.139))",
                "linear-gradient(rgba(255 255 255 / 0.142), rgba(255 255 255 / 0.142))",
                "linear-gradient(rgba(255 255 255 / 0.145), rgba(255 255 255 / 0.145))",
                "linear-gradient(rgba(255 255 255 / 0.147), rgba(255 255 255 / 0.147))",
                "linear-gradient(rgba(255 255 255 / 0.15), rgba(255 255 255 / 0.15))",
                "linear-gradient(rgba(255 255 255 / 0.152), rgba(255 255 255 / 0.152))",
                "linear-gradient(rgba(255 255 255 / 0.155), rgba(255 255 255 / 0.155))",
                "linear-gradient(rgba(255 255 255 / 0.157), rgba(255 255 255 / 0.157))",
                "linear-gradient(rgba(255 255 255 / 0.159), rgba(255 255 255 / 0.159))",
                "linear-gradient(rgba(255 255 255 / 0.161), rgba(255 255 255 / 0.161))",
                "linear-gradient(rgba(255 255 255 / 0.163), rgba(255 255 255 / 0.163))",
                "linear-gradient(rgba(255 255 255 / 0.165), rgba(255 255 255 / 0.165))"
            ]
        }
    },
    "font": {
        "h1": "300 6rem/1.167 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "h2": "300 3.75rem/1.2 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "h3": "400 3rem/1.167 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "h4": "400 2.125rem/1.235 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "h5": "400 1.5rem/1.334 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "h6": "500 1.25rem/1.6 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "subtitle1": "400 1rem/1.75 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "subtitle2": "500 0.875rem/1.57 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "body1": "400 1rem/1.5 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "body2": "400 0.875rem/1.43 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "button": "500 0.875rem/1.75 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "caption": "400 0.75rem/1.66 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "overline": "400 0.75rem/2.66 \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "inherit": "inherit inherit/inherit inherit"
    },
    "vars": {
        "spacing": "var(--mui-spacing)",
        "shape": {
            "borderRadius": "var(--mui-shape-borderRadius)"
        },
        "shadows": [
            "var(--mui-shadows-0)",
            "var(--mui-shadows-1)",
            "var(--mui-shadows-2)",
            "var(--mui-shadows-3)",
            "var(--mui-shadows-4)",
            "var(--mui-shadows-5)",
            "var(--mui-shadows-6)",
            "var(--mui-shadows-7)",
            "var(--mui-shadows-8)",
            "var(--mui-shadows-9)",
            "var(--mui-shadows-10)",
            "var(--mui-shadows-11)",
            "var(--mui-shadows-12)",
            "var(--mui-shadows-13)",
            "var(--mui-shadows-14)",
            "var(--mui-shadows-15)",
            "var(--mui-shadows-16)",
            "var(--mui-shadows-17)",
            "var(--mui-shadows-18)",
            "var(--mui-shadows-19)",
            "var(--mui-shadows-20)",
            "var(--mui-shadows-21)",
            "var(--mui-shadows-22)",
            "var(--mui-shadows-23)",
            "var(--mui-shadows-24)"
        ],
        "zIndex": {
            "mobileStepper": "var(--mui-zIndex-mobileStepper)",
            "fab": "var(--mui-zIndex-fab)",
            "speedDial": "var(--mui-zIndex-speedDial)",
            "appBar": "var(--mui-zIndex-appBar)",
            "drawer": "var(--mui-zIndex-drawer)",
            "modal": "var(--mui-zIndex-modal)",
            "snackbar": "var(--mui-zIndex-snackbar)",
            "tooltip": "var(--mui-zIndex-tooltip)"
        },
        "font": {
            "h1": "var(--mui-font-h1)",
            "h2": "var(--mui-font-h2)",
            "h3": "var(--mui-font-h3)",
            "h4": "var(--mui-font-h4)",
            "h5": "var(--mui-font-h5)",
            "h6": "var(--mui-font-h6)",
            "subtitle1": "var(--mui-font-subtitle1)",
            "subtitle2": "var(--mui-font-subtitle2)",
            "body1": "var(--mui-font-body1)",
            "body2": "var(--mui-font-body2)",
            "button": "var(--mui-font-button)",
            "caption": "var(--mui-font-caption)",
            "overline": "var(--mui-font-overline)",
            "inherit": "var(--mui-font-inherit)"
        },
        "palette": {
            "common": {
                "black": "var(--mui-palette-common-black)",
                "white": "var(--mui-palette-common-white)",
                "background": "var(--mui-palette-common-background)",
                "onBackground": "var(--mui-palette-common-onBackground)",
                "backgroundChannel": "var(--mui-palette-common-backgroundChannel)",
                "onBackgroundChannel": "var(--mui-palette-common-onBackgroundChannel)"
            },
            "primary": {
                "main": "var(--mui-palette-primary-main)",
                "light": "var(--mui-palette-primary-light)",
                "dark": "var(--mui-palette-primary-dark)",
                "contrastText": "var(--mui-palette-primary-contrastText)",
                "mainChannel": "var(--mui-palette-primary-mainChannel)",
                "lightChannel": "var(--mui-palette-primary-lightChannel)",
                "darkChannel": "var(--mui-palette-primary-darkChannel)",
                "contrastTextChannel": "var(--mui-palette-primary-contrastTextChannel)"
            },
            "secondary": {
                "main": "var(--mui-palette-secondary-main)",
                "light": "var(--mui-palette-secondary-light)",
                "dark": "var(--mui-palette-secondary-dark)",
                "contrastText": "var(--mui-palette-secondary-contrastText)",
                "mainChannel": "var(--mui-palette-secondary-mainChannel)",
                "lightChannel": "var(--mui-palette-secondary-lightChannel)",
                "darkChannel": "var(--mui-palette-secondary-darkChannel)",
                "contrastTextChannel": "var(--mui-palette-secondary-contrastTextChannel)"
            },
            "error": {
                "main": "var(--mui-palette-error-main)",
                "light": "var(--mui-palette-error-light)",
                "dark": "var(--mui-palette-error-dark)",
                "contrastText": "var(--mui-palette-error-contrastText)",
                "mainChannel": "var(--mui-palette-error-mainChannel)",
                "lightChannel": "var(--mui-palette-error-lightChannel)",
                "darkChannel": "var(--mui-palette-error-darkChannel)",
                "contrastTextChannel": "var(--mui-palette-error-contrastTextChannel)"
            },
            "warning": {
                "main": "var(--mui-palette-warning-main)",
                "light": "var(--mui-palette-warning-light)",
                "dark": "var(--mui-palette-warning-dark)",
                "contrastText": "var(--mui-palette-warning-contrastText)",
                "mainChannel": "var(--mui-palette-warning-mainChannel)",
                "lightChannel": "var(--mui-palette-warning-lightChannel)",
                "darkChannel": "var(--mui-palette-warning-darkChannel)",
                "contrastTextChannel": "var(--mui-palette-warning-contrastTextChannel)"
            },
            "info": {
                "main": "var(--mui-palette-info-main)",
                "light": "var(--mui-palette-info-light)",
                "dark": "var(--mui-palette-info-dark)",
                "contrastText": "var(--mui-palette-info-contrastText)",
                "mainChannel": "var(--mui-palette-info-mainChannel)",
                "lightChannel": "var(--mui-palette-info-lightChannel)",
                "darkChannel": "var(--mui-palette-info-darkChannel)",
                "contrastTextChannel": "var(--mui-palette-info-contrastTextChannel)"
            },
            "success": {
                "main": "var(--mui-palette-success-main)",
                "light": "var(--mui-palette-success-light)",
                "dark": "var(--mui-palette-success-dark)",
                "contrastText": "var(--mui-palette-success-contrastText)",
                "mainChannel": "var(--mui-palette-success-mainChannel)",
                "lightChannel": "var(--mui-palette-success-lightChannel)",
                "darkChannel": "var(--mui-palette-success-darkChannel)",
                "contrastTextChannel": "var(--mui-palette-success-contrastTextChannel)"
            },
            "grey": {
                "50": "var(--mui-palette-grey-50)",
                "100": "var(--mui-palette-grey-100)",
                "200": "var(--mui-palette-grey-200)",
                "300": "var(--mui-palette-grey-300)",
                "400": "var(--mui-palette-grey-400)",
                "500": "var(--mui-palette-grey-500)",
                "600": "var(--mui-palette-grey-600)",
                "700": "var(--mui-palette-grey-700)",
                "800": "var(--mui-palette-grey-800)",
                "900": "var(--mui-palette-grey-900)",
                "A100": "var(--mui-palette-grey-A100)",
                "A200": "var(--mui-palette-grey-A200)",
                "A400": "var(--mui-palette-grey-A400)",
                "A700": "var(--mui-palette-grey-A700)"
            },
            "text": {
                "primary": "var(--mui-palette-text-primary)",
                "secondary": "var(--mui-palette-text-secondary)",
                "disabled": "var(--mui-palette-text-disabled)",
                "icon": "var(--mui-palette-text-icon)",
                "primaryChannel": "var(--mui-palette-text-primaryChannel)",
                "secondaryChannel": "var(--mui-palette-text-secondaryChannel)"
            },
            "divider": "var(--mui-palette-divider)",
            "background": {
                "paper": "var(--mui-palette-background-paper)",
                "default": "var(--mui-palette-background-default)",
                "defaultChannel": "var(--mui-palette-background-defaultChannel)",
                "paperChannel": "var(--mui-palette-background-paperChannel)"
            },
            "action": {
                "active": "var(--mui-palette-action-active)",
                "hover": "var(--mui-palette-action-hover)",
                "hoverOpacity": "var(--mui-palette-action-hoverOpacity)",
                "selected": "var(--mui-palette-action-selected)",
                "selectedOpacity": "var(--mui-palette-action-selectedOpacity)",
                "disabled": "var(--mui-palette-action-disabled)",
                "disabledBackground": "var(--mui-palette-action-disabledBackground)",
                "disabledOpacity": "var(--mui-palette-action-disabledOpacity)",
                "focus": "var(--mui-palette-action-focus)",
                "focusOpacity": "var(--mui-palette-action-focusOpacity)",
                "activatedOpacity": "var(--mui-palette-action-activatedOpacity)",
                "activeChannel": "var(--mui-palette-action-activeChannel)",
                "selectedChannel": "var(--mui-palette-action-selectedChannel)"
            },
            "Alert": {
                "errorColor": "var(--mui-palette-Alert-errorColor)",
                "infoColor": "var(--mui-palette-Alert-infoColor)",
                "successColor": "var(--mui-palette-Alert-successColor)",
                "warningColor": "var(--mui-palette-Alert-warningColor)",
                "errorFilledBg": "var(--mui-palette-Alert-errorFilledBg)",
                "infoFilledBg": "var(--mui-palette-Alert-infoFilledBg)",
                "successFilledBg": "var(--mui-palette-Alert-successFilledBg)",
                "warningFilledBg": "var(--mui-palette-Alert-warningFilledBg)",
                "errorFilledColor": "var(--mui-palette-Alert-errorFilledColor)",
                "infoFilledColor": "var(--mui-palette-Alert-infoFilledColor)",
                "successFilledColor": "var(--mui-palette-Alert-successFilledColor)",
                "warningFilledColor": "var(--mui-palette-Alert-warningFilledColor)",
                "errorStandardBg": "var(--mui-palette-Alert-errorStandardBg)",
                "infoStandardBg": "var(--mui-palette-Alert-infoStandardBg)",
                "successStandardBg": "var(--mui-palette-Alert-successStandardBg)",
                "warningStandardBg": "var(--mui-palette-Alert-warningStandardBg)",
                "errorIconColor": "var(--mui-palette-Alert-errorIconColor)",
                "infoIconColor": "var(--mui-palette-Alert-infoIconColor)",
                "successIconColor": "var(--mui-palette-Alert-successIconColor)",
                "warningIconColor": "var(--mui-palette-Alert-warningIconColor)"
            },
            "AppBar": {
                "defaultBg": "var(--mui-palette-AppBar-defaultBg)",
                "darkBg": "var(--mui-palette-AppBar-darkBg)",
                "darkColor": "var(--mui-palette-AppBar-darkColor)"
            },
            "Avatar": {
                "defaultBg": "var(--mui-palette-Avatar-defaultBg)"
            },
            "Button": {
                "inheritContainedBg": "var(--mui-palette-Button-inheritContainedBg)",
                "inheritContainedHoverBg": "var(--mui-palette-Button-inheritContainedHoverBg)"
            },
            "Chip": {
                "defaultBorder": "var(--mui-palette-Chip-defaultBorder)",
                "defaultAvatarColor": "var(--mui-palette-Chip-defaultAvatarColor)",
                "defaultIconColor": "var(--mui-palette-Chip-defaultIconColor)"
            },
            "FilledInput": {
                "bg": "var(--mui-palette-FilledInput-bg)",
                "hoverBg": "var(--mui-palette-FilledInput-hoverBg)",
                "disabledBg": "var(--mui-palette-FilledInput-disabledBg)"
            },
            "LinearProgress": {
                "primaryBg": "var(--mui-palette-LinearProgress-primaryBg)",
                "secondaryBg": "var(--mui-palette-LinearProgress-secondaryBg)",
                "errorBg": "var(--mui-palette-LinearProgress-errorBg)",
                "infoBg": "var(--mui-palette-LinearProgress-infoBg)",
                "successBg": "var(--mui-palette-LinearProgress-successBg)",
                "warningBg": "var(--mui-palette-LinearProgress-warningBg)"
            },
            "Skeleton": {
                "bg": "var(--mui-palette-Skeleton-bg)"
            },
            "Slider": {
                "primaryTrack": "var(--mui-palette-Slider-primaryTrack)",
                "secondaryTrack": "var(--mui-palette-Slider-secondaryTrack)",
                "errorTrack": "var(--mui-palette-Slider-errorTrack)",
                "infoTrack": "var(--mui-palette-Slider-infoTrack)",
                "successTrack": "var(--mui-palette-Slider-successTrack)",
                "warningTrack": "var(--mui-palette-Slider-warningTrack)"
            },
            "SnackbarContent": {
                "bg": "var(--mui-palette-SnackbarContent-bg)",
                "color": "var(--mui-palette-SnackbarContent-color)"
            },
            "SpeedDialAction": {
                "fabHoverBg": "var(--mui-palette-SpeedDialAction-fabHoverBg)"
            },
            "StepConnector": {
                "border": "var(--mui-palette-StepConnector-border)"
            },
            "StepContent": {
                "border": "var(--mui-palette-StepContent-border)"
            },
            "Switch": {
                "defaultColor": "var(--mui-palette-Switch-defaultColor)",
                "defaultDisabledColor": "var(--mui-palette-Switch-defaultDisabledColor)",
                "primaryDisabledColor": "var(--mui-palette-Switch-primaryDisabledColor)",
                "secondaryDisabledColor": "var(--mui-palette-Switch-secondaryDisabledColor)",
                "errorDisabledColor": "var(--mui-palette-Switch-errorDisabledColor)",
                "infoDisabledColor": "var(--mui-palette-Switch-infoDisabledColor)",
                "successDisabledColor": "var(--mui-palette-Switch-successDisabledColor)",
                "warningDisabledColor": "var(--mui-palette-Switch-warningDisabledColor)"
            },
            "TableCell": {
                "border": "var(--mui-palette-TableCell-border)"
            },
            "Tooltip": {
                "bg": "var(--mui-palette-Tooltip-bg)"
            },
            "dividerChannel": "var(--mui-palette-dividerChannel)"
        },
        "opacity": {
            "inputPlaceholder": "var(--mui-opacity-inputPlaceholder)",
            "inputUnderline": "var(--mui-opacity-inputUnderline)",
            "switchTrackDisabled": "var(--mui-opacity-switchTrackDisabled)",
            "switchTrack": "var(--mui-opacity-switchTrack)"
        },
        "overlays": [
            "var(--mui-overlays-0)",
            "var(--mui-overlays-1)",
            "var(--mui-overlays-2)",
            "var(--mui-overlays-3)",
            "var(--mui-overlays-4)",
            "var(--mui-overlays-5)",
            "var(--mui-overlays-6)",
            "var(--mui-overlays-7)",
            "var(--mui-overlays-8)",
            "var(--mui-overlays-9)",
            "var(--mui-overlays-10)",
            "var(--mui-overlays-11)",
            "var(--mui-overlays-12)",
            "var(--mui-overlays-13)",
            "var(--mui-overlays-14)",
            "var(--mui-overlays-15)",
            "var(--mui-overlays-16)",
            "var(--mui-overlays-17)",
            "var(--mui-overlays-18)",
            "var(--mui-overlays-19)",
            "var(--mui-overlays-20)",
            "var(--mui-overlays-21)",
            "var(--mui-overlays-22)",
            "var(--mui-overlays-23)",
            "var(--mui-overlays-24)"
        ]
    },
    "palette": {
        "mode": "light",
        "common": {
            "black": "#000",
            "white": "#fff",
            "background": "#fff",
            "onBackground": "#000",
            "backgroundChannel": "255 255 255",
            "onBackgroundChannel": "0 0 0"
        },
        "primary": {
            "main": "#1976d2",
            "light": "#42a5f5",
            "dark": "#1565c0",
            "contrastText": "#fff",
            "mainChannel": "25 118 210",
            "lightChannel": "66 165 245",
            "darkChannel": "21 101 192",
            "contrastTextChannel": "255 255 255"
        },
        "secondary": {
            "main": "#9c27b0",
            "light": "#ba68c8",
            "dark": "#7b1fa2",
            "contrastText": "#fff",
            "mainChannel": "156 39 176",
            "lightChannel": "186 104 200",
            "darkChannel": "123 31 162",
            "contrastTextChannel": "255 255 255"
        },
        "error": {
            "main": "#d32f2f",
            "light": "#ef5350",
            "dark": "#c62828",
            "contrastText": "#fff",
            "mainChannel": "211 47 47",
            "lightChannel": "239 83 80",
            "darkChannel": "198 40 40",
            "contrastTextChannel": "255 255 255"
        },
        "warning": {
            "main": "#ed6c02",
            "light": "#ff9800",
            "dark": "#e65100",
            "contrastText": "#fff",
            "mainChannel": "237 108 2",
            "lightChannel": "255 152 0",
            "darkChannel": "230 81 0",
            "contrastTextChannel": "255 255 255"
        },
        "info": {
            "main": "#0288d1",
            "light": "#03a9f4",
            "dark": "#01579b",
            "contrastText": "#fff",
            "mainChannel": "2 136 209",
            "lightChannel": "3 169 244",
            "darkChannel": "1 87 155",
            "contrastTextChannel": "255 255 255"
        },
        "success": {
            "main": "#2e7d32",
            "light": "#4caf50",
            "dark": "#1b5e20",
            "contrastText": "#fff",
            "mainChannel": "46 125 50",
            "lightChannel": "76 175 80",
            "darkChannel": "27 94 32",
            "contrastTextChannel": "255 255 255"
        },
        "grey": {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121",
            "A100": "#f5f5f5",
            "A200": "#eeeeee",
            "A400": "#bdbdbd",
            "A700": "#616161"
        },
        "contrastThreshold": 3,
        "tonalOffset": 0.2,
        "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.6)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "primaryChannel": "0 0 0",
            "secondaryChannel": "0 0 0"
        },
        "divider": "rgba(0, 0, 0, 0.12)",
        "background": {
            "paper": "#fff",
            "default": "#fff",
            "defaultChannel": "255 255 255",
            "paperChannel": "255 255 255"
        },
        "action": {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": "rgba(0, 0, 0, 0.04)",
            "hoverOpacity": 0.04,
            "selected": "rgba(0, 0, 0, 0.08)",
            "selectedOpacity": 0.08,
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)",
            "disabledOpacity": 0.38,
            "focus": "rgba(0, 0, 0, 0.12)",
            "focusOpacity": 0.12,
            "activatedOpacity": 0.12,
            "activeChannel": "0 0 0",
            "selectedChannel": "0 0 0"
        },
        "Alert": {
            "errorColor": "rgb(95, 33, 32)",
            "infoColor": "rgb(1, 67, 97)",
            "successColor": "rgb(30, 70, 32)",
            "warningColor": "rgb(102, 60, 0)",
            "errorFilledBg": "var(--mui-palette-error-main, #d32f2f)",
            "infoFilledBg": "var(--mui-palette-info-main, #0288d1)",
            "successFilledBg": "var(--mui-palette-success-main, #2e7d32)",
            "warningFilledBg": "var(--mui-palette-warning-main, #ed6c02)",
            "errorFilledColor": "#fff",
            "infoFilledColor": "#fff",
            "successFilledColor": "#fff",
            "warningFilledColor": "#fff",
            "errorStandardBg": "rgb(253, 237, 237)",
            "infoStandardBg": "rgb(229, 246, 253)",
            "successStandardBg": "rgb(237, 247, 237)",
            "warningStandardBg": "rgb(255, 244, 229)",
            "errorIconColor": "var(--mui-palette-error-main, #d32f2f)",
            "infoIconColor": "var(--mui-palette-info-main, #0288d1)",
            "successIconColor": "var(--mui-palette-success-main, #2e7d32)",
            "warningIconColor": "var(--mui-palette-warning-main, #ed6c02)"
        },
        "AppBar": {
            "defaultBg": "var(--mui-palette-grey-100, #f5f5f5)"
        },
        "Avatar": {
            "defaultBg": "var(--mui-palette-grey-400, #bdbdbd)"
        },
        "Button": {
            "inheritContainedBg": "var(--mui-palette-grey-300, #e0e0e0)",
            "inheritContainedHoverBg": "var(--mui-palette-grey-A100, #f5f5f5)"
        },
        "Chip": {
            "defaultBorder": "var(--mui-palette-grey-400, #bdbdbd)",
            "defaultAvatarColor": "var(--mui-palette-grey-700, #616161)",
            "defaultIconColor": "var(--mui-palette-grey-700, #616161)"
        },
        "FilledInput": {
            "bg": "rgba(0, 0, 0, 0.06)",
            "hoverBg": "rgba(0, 0, 0, 0.09)",
            "disabledBg": "rgba(0, 0, 0, 0.12)"
        },
        "LinearProgress": {
            "primaryBg": "rgb(167, 202, 237)",
            "secondaryBg": "rgb(217, 172, 224)",
            "errorBg": "rgb(238, 175, 175)",
            "infoBg": "rgb(158, 209, 237)",
            "successBg": "rgb(175, 205, 177)",
            "warningBg": "rgb(248, 199, 158)"
        },
        "Skeleton": {
            "bg": "rgba(var(--mui-palette-text-primaryChannel, undefined) / 0.11)"
        },
        "Slider": {
            "primaryTrack": "rgb(167, 202, 237)",
            "secondaryTrack": "rgb(217, 172, 224)",
            "errorTrack": "rgb(238, 175, 175)",
            "infoTrack": "rgb(158, 209, 237)",
            "successTrack": "rgb(175, 205, 177)",
            "warningTrack": "rgb(248, 199, 158)"
        },
        "SnackbarContent": {
            "bg": "rgb(50, 50, 50)",
            "color": "#fff"
        },
        "SpeedDialAction": {
            "fabHoverBg": "rgb(216, 216, 216)"
        },
        "StepConnector": {
            "border": "var(--mui-palette-grey-400, #bdbdbd)"
        },
        "StepContent": {
            "border": "var(--mui-palette-grey-400, #bdbdbd)"
        },
        "Switch": {
            "defaultColor": "var(--mui-palette-common-white, #fff)",
            "defaultDisabledColor": "var(--mui-palette-grey-100, #f5f5f5)",
            "primaryDisabledColor": "rgb(167, 202, 237)",
            "secondaryDisabledColor": "rgb(217, 172, 224)",
            "errorDisabledColor": "rgb(238, 175, 175)",
            "infoDisabledColor": "rgb(158, 209, 237)",
            "successDisabledColor": "rgb(175, 205, 177)",
            "warningDisabledColor": "rgb(248, 199, 158)"
        },
        "TableCell": {
            "border": "rgba(224, 224, 224, 1)"
        },
        "Tooltip": {
            "bg": "rgba(97, 97, 97, 0.92)"
        },
        "dividerChannel": "0 0 0"
    },
    "opacity": {
        "inputPlaceholder": 0.42,
        "inputUnderline": 0.42,
        "switchTrackDisabled": 0.12,
        "switchTrack": 0.38
    },
    "overlays": {}
}
            */
            return ({});
          }
        }
      },
    },

  }), []);

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
