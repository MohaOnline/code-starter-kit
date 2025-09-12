export const tailwind_classes_text_smoothing = [
  {name: 'antialiased', description: '应用 grayscale antialiasing 灰度抗锯齿'},
  {name: 'subpixel-antialiased', description: '应用 subpixel antialiasing 子像素抗锯齿'},
]

export const tailwind_classes_text_color = [
  'text-orange-100',
  'text-orange-200',
];

//
export const tailwind_classes_text_size = [
  'text-xs',
  'text-sm',
  'text-base', // 1rem = 16px, line-height: 1.5rm = 24px.
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
  'text-7xl',
  'text-[32pt]',
];

// @see https://v3.tailwindcss.com/docs/font-weight
export const tailwind_classes_text_weight = [
  {name: 'font-thin', description: 'font-weight: 100;',},
  {name: 'font-extralight',},
  {name: 'font-light',},
  {name: 'font-normal',},
  {name: 'font-medium',},
  {name: 'font-semibold',},
  {name: 'font-bold',},
  {name: 'font-extrabold', description: 'font-weight: 800;',},
  {name: 'font-black', description: 'font-weight: 900;'},
]

export const tailwind_classes_text_align = [
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
  'text-start',
  'text-end',
];

// @see https://v3.tailwindcss.com/docs/text-transform
export const tailwind_classes_text_transform = [
  {name: 'uppercase'},
  {name: 'lowercase'},
  {name: 'capitalize'},
  {name: 'normal-case', description: '还原大小写'},
]

// @see https://v3.tailwindcss.com/docs/letter-spacing
export const tailwind_classes_letter_spacing = [
  {name: 'tracking-tighter', description: 'letter-spacing: -0.05em;'},
  {name: 'tracking-tight', description: 'letter-spacing: -0.025em;'},
  {name: 'tracking-normal', description: 'letter-spacing: 0em;', default: true},
  {name: 'tracking-wide', description: 'letter-spacing: 0.025em;'},
  {name: 'tracking-wider', description: 'letter-spacing: 0.05em;'},
  {name: 'tracking-widest', description: 'letter-spacing: 0.1em;'},
  {name: 'tracking-[0.25em]', description: '自定义：letter-spacing: 0.25em;'},
]

export const tailwind_classes_decoration = [
  // @see https://v3.tailwindcss.com/docs/text-decoration
  {name: 'underline', description: 'text-decoration-line: underline;', group: 'decoration-line'},
  {name: 'overline', description: 'text-decoration-line: overline;', group: 'decoration-line'},
  {name: 'line-through', description: 'text-decoration-line: line-through;', group: 'decoration-line'},
  {name: 'no-underline', description: 'text-decoration-line: none;', group: 'decoration-line'},

  // @see https://v3.tailwindcss.com/docs/text-decoration-color
  {name: 'decoration-inherit', description: 'text-decoration-color: inherit;', group: 'decoration-color'},
  {name: 'decoration-transparent', description: 'text-decoration-color: transparent;', group: 'decoration-color'},
  {name: 'decoration-current', description: 'text-decoration-color: currentColor;', group: 'decoration-color'},
  {name: 'decoration-red-100', description: 'text-decoration-color: #fee2e2;', group: 'decoration-color'},
  {name: 'decoration-red-200', description: 'text-decoration-color: #fecaca;', group: 'decoration-color'},
  {name: 'decoration-red-300', description: 'text-decoration-color: #fca5a5;', group: 'decoration-color'},
  {name: 'decoration-red-400', description: 'text-decoration-color: #f87171;', group: 'decoration-color'},
  {name: 'decoration-red-500', description: 'text-decoration-color: #ef4444;', group: 'decoration-color'},
  {name: 'decoration-red-600', description: 'text-decoration-color: #dc2626;', group: 'decoration-color'},

  // @see https://v3.tailwindcss.com/docs/text-decoration-style
  {name: 'decoration-solid', description: 'text-decoration-style: solid;', group: 'decoration-style'},
  {name: 'decoration-double', description: 'text-decoration-style: double;', group: 'decoration-style'},
  {name: 'decoration-dotted', description: 'text-decoration-style: dotted;', group: 'decoration-style'},
  {name: 'decoration-dashed', description: 'text-decoration-style: dashed;', group: 'decoration-style'},
  {name: 'decoration-wavy', description: 'text-decoration-style: wavy;', group: 'decoration-style'},

  // @see https://v3.tailwindcss.com/docs/text-decoration-thickness
  {name: 'decoration-auto', description: 'text-decoration-thickness: auto;', group: 'decoration-thickness'},
  {name: 'decoration-from-font', description: 'text-decoration-thickness: from-font;', group: 'decoration-thickness'},
  {name: 'decoration-0', description: 'text-decoration-thickness: 0;', group: 'decoration-thickness'},
  {name: 'decoration-1', description: 'text-decoration-thickness: 1px;', group: 'decoration-thickness'},
  {name: 'decoration-2', description: 'text-decoration-thickness: 2px;', group: 'decoration-thickness'},
  {name: 'decoration-4', description: 'text-decoration-thickness: 4px;', group: 'decoration-thickness'},
  {name: 'decoration-8', description: 'text-decoration-thickness: 8px;', group: 'decoration-thickness'},

  // @see https://v3.tailwindcss.com/docs/text-underline-offset
  {name: 'underline-offset-auto', description: 'text-underline-offset: auto;', group: 'underline-offset'},
  {name: 'underline-offset-0', description: 'text-underline-offset: 0;', group: 'underline-offset'},
  {name: 'underline-offset-1', description: 'text-underline-offset: 1px;', group: 'underline-offset'},
  {name: 'underline-offset-2', description: 'text-underline-offset: 2px;', group: 'underline-offset'},
  {name: 'underline-offset-4', description: 'text-underline-offset: 4px;', group: 'underline-offset'},
  {name: 'underline-offset-8', description: 'text-underline-offset: 8px;', group: 'underline-offset'},
]

export const tailwind_classes_vertical_align = [
  {name: 'align-top', description: 'vertical-align: top;'},
  {name: 'align-middle', description: 'vertical-align: middle;'},
  {name: 'align-bottom', description: 'vertical-align: bottom;'},
  {name: 'align-baseline', description: 'vertical-align: baseline;'},
  {name: 'align-text-top', description: 'vertical-align: text-top;'},
  {name: 'align-text-bottom', description: 'vertical-align: text-bottom;'},
  {name: 'align-sub', description: 'vertical-align: sub;'},
  {name: 'align-super', description: 'vertical-align: super;'},
  {name: 'align-[4px]', description: ''}
]

// @see https://v3.tailwindcss.com/docs/margin
export const tailwind_classes_boxing_margin = [
  {name: 'box-border', description: 'box-sizing: border-box;', group: 'box-sizing', default: true},
  {name: 'box-content', description: 'box-sizing: content-box;', group: 'box-sizing'},

  {name: 'm-0', description: 'margin: 0;', group: 'margin'},
  {name: 'm-px', description: 'margin: 1px;', group: 'margin'},
  {name: 'm-0.5', description: 'margin: 0.125rem;', group: 'margin'},
  {name: 'm-4', description: 'margin: 1rem;', group: 'margin'},
  {name: 'm-96', description: 'margin: 24rem;', group: 'margin'},
  {name: 'm-auto', description: 'margin: auto;', group: 'margin'},

  {name: 'mx-0', description: 'margin-left: 0; margin-right: 0;', group: 'margin-x'},
  {name: 'mx-px', description: 'margin-left: 1px; margin-right: 1px;', group: 'margin-x'},
  {name: 'mx-0.5', description: 'margin-left: 0.125rem; margin-right: 0.125rem;', group: 'margin-x'},
  {name: 'mx-4', description: 'margin-left: 1rem; margin-right: 1rem;', group: 'margin-x'},
  {name: 'mx-96', description: 'margin-left: 24rem; margin-right: 24rem;', group: 'margin-x'},
  {name: 'mx-auto', description: 'margin-left: auto; margin-right: auto;', group: 'margin-x'},

  {name: 'my-0', description: 'margin-top: 0; margin-bottom: 0;', group: 'margin-y'},
  {name: 'my-px', description: 'margin-top: 1px; margin-bottom: 1px;', group: 'margin-y'},
  {name: 'my-0.5', description: 'margin-top: 0.125rem; margin-bottom: 0.125rem;', group: 'margin-y'},
  {name: 'my-4', description: 'margin-top: 1rem; margin-bottom: 1rem;', group: 'margin-y'},
  {name: 'my-96', description: 'margin-top: 24rem; margin-bottom: 24rem;', group: 'margin-y'},
  {name: 'my-auto', description: 'margin-top: auto; margin-bottom: auto;', group: 'margin-y'},

  {name: 'mt-0', description: 'margin-top: 0;', group: 'margin-top'},
  {name: 'mt-px', description: 'margin-top: 1px;', group: 'margin-top'},
  {name: 'mt-0.5', description: 'margin-top: 0.125rem;', group: 'margin-top'},
  {name: 'mt-4', description: 'margin-top: 1rem;', group: 'margin-top'},
  {name: 'mt-96', description: 'margin-top: 24rem;', group: 'margin-top'},
  {name: 'mt-auto', description: 'margin-top: auto;', group: 'margin-top'},
  {name: '-mt-10', description: '支持负值：margin-top: -2.5rem;', group: 'margin-top'},

  {name: 'mr-0', description: 'margin-right: 0;', group: 'margin-right'},
  {name: 'mr-px', description: 'margin-right: 1px;', group: 'margin-right'},
  {name: 'mr-0.5', description: 'margin-right: 0.125rem;', group: 'margin-right'},

  {name: 'mb-0', description: 'margin-bottom: 0;', group: 'margin-bottom'},
  {name: 'mb-px', description: 'margin-bottom: 1px;', group: 'margin-bottom'},
  {name: 'mb-0.5', description: 'margin-bottom: 0.125rem;', group: 'margin-bottom'},

  {name: 'ml-0', description: 'margin-left: 0;', group: 'margin-left'},
  {name: 'ml-px', description: 'margin-left: 1px;', group: 'margin-left'},
  {name: 'ml-0.5', description: 'margin-left: 0.125rem;', group: 'margin-left'},

  {name: 'ms-0', description: 'margin-inline-start: 0;', group: 'margin-inline-start'},
  {name: 'ms-px', description: 'margin-inline-start: 1px;', group: 'margin-inline-start'},
  {name: 'ms-0.5', description: 'margin-inline-start: 0.125rem;', group: 'margin-inline-start'},
  {name: 'ms-4', description: 'margin-inline-start: 1rem;', group: 'margin-inline-start'},
  {name: 'ms-96', description: 'margin-inline-start: 24rem;', group: 'margin-inline-start'},
  {name: 'ms-auto', description: 'margin-inline-start: auto;', group: 'margin-inline-start'},

  {name: 'me-0', description: 'margin-inline-end: 0;', group: 'margin-inline-end'},
  {name: 'me-px', description: 'margin-inline-end: 1px;', group: 'margin-inline-end'},
  {name: 'me-0.5', description: 'margin-inline-end: 0.125rem;', group: 'margin-inline-end'},
]

// @see https://v3.tailwindcss.com/docs/padding
export const tailwind_classes_boxing_padding = []

// @see https://v3.tailwindcss.com/docs/border-width
export const tailwind_classes_boxing_border = [
  {name: 'border', description: 'border-width: 1px;', group: 'border-default'},

  {name: 'border-0', description: 'border-width: 0;', group: 'border-width'},
  {name: 'border-2', description: 'border-width: 2px;', group: 'border-width'},
  {name: 'border-4', description: 'border-width: 4px;', group: 'border-width'},

  {name: 'border-x', description: 'border-left-width: 1px; border-right-width: 1px;', group: 'border-x-width'},
  {name: 'border-x-0', description: 'border-left-width: 0; border-right-width: 0;', group: 'border-x-width'},
  {name: 'border-x-2', description: 'border-left-width: 2px; border-right-width: 2px;', group: 'border-x-width'},
  {name: 'border-x-4', description: 'border-left-width: 4px; border-right-width: 4px;', group: 'border-x-width'},
  {name: 'border-x-8', description: 'border-left-width: 8px; border-right-width: 8px;', group: 'border-x-width'},

  {name: 'border-t-0', description: 'border-top-width: 0;', group: 'border-top-width'},
]