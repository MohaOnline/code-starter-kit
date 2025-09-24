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

  // @see https://v3.tailwindcss.com/docs/space
  {name: 'space-x-0', description: 'margin-left: 0; margin-right: 0;', group: 'margin-x'},
  {name: 'space-x-px', description: 'margin-left: 1px; margin-right: 1px;', group: 'margin-x'},
  {name: 'space-x-0.5', description: 'margin-left: 0.125rem; margin-right: 0.125rem;', group: 'margin-x'},
  {name: 'space-x-3.5', description: 'margin-left: 0.875rem; /* 14px */ margin-right: 0.875rem; /* 14px */', group: 'margin-x'},
  {name: 'space-x-4', description: 'margin-left: 1rem; margin-right: 1rem;', group: 'margin-x'},
  {name: 'space-x-96', description: 'margin-left: 24rem; margin-right: 24rem;', group: 'margin-x'},

  {name: 'space-y-0', description: 'margin-top: 0; margin-bottom: 0;', group: 'margin-y'},
  {name: 'space-y-px', description: 'margin-top: 1px; margin-bottom: 1px;', group: 'margin-y'},
  {name: 'space-y-0.5', description: 'margin-top: 0.125rem; margin-bottom: 0.125rem;', group: 'margin-y'},
  {name: 'space-y-3.5', description: 'margin-top: 0.875rem; /* 14px */ margin-bottom: 0.875rem; /* 14px */', group: 'margin-y'},
  {name: 'space-y-4', description: 'margin-top: 1rem; margin-bottom: 1rem;', group: 'margin-y'},
  {name: 'space-y-96', description: 'margin-top: 24rem; margin-bottom: 24rem;', group: 'margin-y'},

  {name: 'space-x-reverse', description: 'margin-right: 0; margin-left: auto;', group: 'margin-x-reverse'},
  {name: 'space-y-reverse', description: 'margin-top: 0; margin-bottom: auto;', group: 'margin-y-reverse'},


]

// @see https://v3.tailwindcss.com/docs/padding
export const tailwind_classes_boxing_padding = [
  {name: 'box-border', description: 'box-sizing: border-box;', group: 'box-sizing', default: true},
  {name: 'box-content', description: 'box-sizing: content-box;', group: 'box-sizing'},

  {name: 'p-0', description: 'padding: 0;', group: 'padding'},
  {name: 'p-px', description: 'padding: 1px;', group: 'padding'},
  {name: 'p-0.5', description: 'padding: 0.125rem;', group: 'padding'},
  {name: 'p-4', description: 'padding: 1rem;', group: 'padding'},
  {name: 'p-96', description: 'padding: 24rem;', group: 'padding'},

  {name: 'px-0', description: 'padding-left: 0; padding-right: 0;', group: 'padding-x'},
  {name: 'px-px', description: 'padding-left: 1px; padding-right: 1px;', group: 'padding-x'},
  {name: 'px-0.5', description: 'padding-left: 0.125rem; padding-right: 0.125rem;', group: 'padding-x'},
  {name: 'px-3.5', description: 'padding-left: 0.875rem; /* 14px */ padding-right: 0.875rem; /* 14px */', group: 'padding-x'},
  {name: 'px-4', description: 'padding-left: 1rem; padding-right: 1rem;', group: 'padding-x'},
  {name: 'px-96', description: 'padding-left: 24rem; padding-right: 24rem;', group: 'padding-x'},

  {name: 'py-0', description: 'padding-top: 0; padding-bottom: 0;', group: 'padding-y'},
  {name: 'py-px', description: 'padding-top: 1px; padding-bottom: 1px;', group: 'padding-y'},
  {name: 'py-0.5', description: 'padding-top: 0.125rem; padding-bottom: 0.125rem;', group: 'padding-y'},
  {name: 'py-3.5', description: 'padding-top: 0.875rem; /* 14px */ padding-bottom: 0.875rem; /* 14px */', group: 'padding-y'},
  {name: 'py-4', description: 'padding-top: 1rem; padding-bottom: 1rem;', group: 'padding-y'},
  {name: 'py-96', description: 'padding-top: 24rem; padding-bottom: 24rem;', group: 'padding-y'},

  {name: 'pt-0', description: 'padding-top: 0;', group: 'padding-top'},
  {name: 'pt-px', description: 'padding-top: 1px;', group: 'padding-top'},
  {name: 'pt-0.5', description: 'padding-top: 0.125rem;', group: 'padding-top'},
  {name: 'pt-3.5', description: 'padding-top: 0.875rem; /* 14px */', group: 'padding-top'},
  {name: 'pt-4', description: 'padding-top: 1rem;', group: 'padding-top'},
  {name: 'pt-96', description: 'padding-top: 24rem;', group: 'padding-top'},

  {name: 'pr-0', description: 'padding-right: 0;', group: 'padding-right'},
  {name: 'pr-px', description: 'padding-right: 1px;', group: 'padding-right'},
  {name: 'pr-0.5', description: 'padding-right: 0.125rem;', group: 'padding-right'},
  {name: 'pr-3.5', description: 'padding-right: 0.875rem; /* 14px */', group: 'padding-right'},
  {name: 'pr-4', description: 'padding-right: 1rem;', group: 'padding-right'},
  {name: 'pr-96', description: 'padding-right: 24rem;', group: 'padding-right'},
]

// @see https://v3.tailwindcss.com/docs/border-width
export const tailwind_classes_boxing_border = [
  {name: 'border-0', description: 'border-width: 0;', group: 'border-width'},
  {name: 'border', description: 'border-width: 1px;', group: 'border-width'},
  {name: 'border-2', description: 'border-width: 2px;', group: 'border-width'},
  {name: 'border-4', description: 'border-width: 4px;', group: 'border-width'},

  {name: 'border-x-0', description: 'border-left-width: 0; border-right-width: 0;', group: 'border-x-width'},
  {name: 'border-x', description: 'border-left-width: 1px; border-right-width: 1px;', group: 'border-x-width'},
  {name: 'border-x-2', description: 'border-left-width: 2px; border-right-width: 2px;', group: 'border-x-width'},
  {name: 'border-x-4', description: 'border-left-width: 4px; border-right-width: 4px;', group: 'border-x-width'},
  {name: 'border-x-8', description: 'border-left-width: 8px; border-right-width: 8px;', group: 'border-x-width'},

  {name: 'border-t-0', description: 'border-top-width: 0;', group: 'border-top-width'},
  {name: 'border-t', description: 'border-top-width: 1px;', group: 'border-top-width'},
  {name: 'border-t-2', description: 'border-top-width: 2px;', group: 'border-top-width'},
  {name: 'border-t-4', description: 'border-top-width: 4px;', group: 'border-top-width'},
  {name: 'border-t-8', description: 'border-top-width: 8px;', group: 'border-top-width'},

  {name: 'border-b-0', description: 'border-bottom-width: 0;', group: 'border-bottom-width'},
  {name: 'border-b', description: 'border-bottom-width: 1px;', group: 'border-bottom-width'},
  {name: 'border-b-2', description: 'border-bottom-width: 2px;', group: 'border-bottom-width'},
  {name: 'border-b-4', description: 'border-bottom-width: 4px;', group: 'border-bottom-width'},
  {name: 'border-b-8', description: 'border-bottom-width: 8px;', group: 'border-bottom-width'},

  // 书写方向起始的一侧的边框宽度
  {name: 'border-s', description: 'border-inline-start-width: 1px;', group: 'border-start-width'},
  {name: 'border-s-0', description: 'border-inline-start-width: 0;', group: 'border-start-width'},
  {name: 'border-s-2', description: 'border-inline-start-width: 2px;', group: 'border-start-width'},
  {name: 'border-s-4', description: 'border-inline-start-width: 4px;', group: 'border-start-width'},
  {name: 'border-s-8', description: 'border-inline-start-width: 8px;', group: 'border-start-width'},

  {name: 'border-e', description: 'border-inline-end-width: 1px;', group: 'border-end-width'},
  {name: 'border-e-0', description: 'border-inline-end-width: 0;', group: 'border-end-width'},
  {name: 'border-e-2', description: 'border-inline-end-width: 2px;', group: 'border-end-width'},
  {name: 'border-e-4', description: 'border-inline-end-width: 4px;', group: 'border-end-width'},
  {name: 'border-e-8', description: 'border-inline-end-width: 8px;', group: 'border-end-width'},

  // @see https://v3.tailwindcss.com/docs/border-color
  {name: 'border-red-100', description: 'border-color: #fff5f5;', group: 'border-color'},
  {name: 'border-red-200', description: 'border-color: #fed7d7;', group: 'border-color'},
  {name: 'border-red-300', description: 'border-color: #feb2b2;', group: 'border-color'},
  {name: 'border-red-400', description: 'border-color: #fc8181;', group: 'border-color'},
  {name: 'border-red-600', description: 'border-color: #e53e3e;', group: 'border-color'},
  {name: 'border-red-900', description: 'border-color: #b91c1c;', group: 'border-color'},
  {name: 'border-red-950', description: 'border-color: #7f1d1d;', group: 'border-color'},

  {name: 'border-slate-500', description: 'border-color: rgb(100 116 139 / var(--tw-border-opacity, 1)); /*优先用变量 --tw-border-opacity 的值，若无用 1*/', group: 'border-color'},
  {name: 'border-gray-500', description: 'border-color: rgb(107 114 128 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-zinc-500', description: 'border-color: rgb(107 114 128 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-neutral-500', description: 'border-color: rgb(107 114 128 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-stone-500', description: 'border-color: rgb(107 114 128 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-red-500', description: 'border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-orange-500', description: 'border-color: rgb(249 115 22 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-amber-500', description: 'border-color: rgb(245 158 11 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-yellow-500', description: 'border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-lime-500', description: 'border-color: rgb(134 151 51 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-green-500', description: 'border-color: rgb(34 197 94 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-emerald-500', description: 'border-color: rgb(16 185 129 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-teal-500', description: 'border-color: rgb(20 184 166 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-cyan-500', description: 'border-color: rgb(6 182 212 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-sky-500', description: 'border-color: rgb(14 165 233 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-blue-500', description: 'border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-indigo-500', description: 'border-color: rgb(99 102 241 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-violet-500', description: 'border-color: rgb(139 92 246 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-purple-500', description: 'border-color: rgb(168 85 247 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-fuchsia-500', description: 'border-color: rgb(217 70 239 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-pink-500', description: 'border-color: rgb(236 72 153 / var(--tw-border-opacity, 1));', group: 'border-color'},
  {name: 'border-rose-500', description: 'border-color: rgb(244 63 94 / var(--tw-border-opacity, 1));', group: 'border-color'},

  // @see https://v3.tailwindcss.com/docs/border-radius
  {name: 'rounded-none', description: 'border-radius: 0;', group: 'border-radius'},
  {name: 'rounded-sm', description: 'border-radius: 0.125rem;', group: 'border-radius'},
  {name: 'rounded', description: 'border-radius: 0.25rem;', group: 'border-radius'},
  {name: 'rounded-md', description: 'border-radius: 0.375rem;', group: 'border-radius'},
  {name: 'rounded-lg', description: 'border-radius: 0.5rem;', group: 'border-radius'},
  {name: 'rounded-xl', description: 'border-radius: 0.75rem;', group: 'border-radius'},
  {name: 'rounded-2xl', description: 'border-radius: 1rem;', group: 'border-radius'},
  {name: 'rounded-3xl', description: 'border-radius: 1.5rem;', group: 'border-radius'},
  {name: 'rounded-full', description: 'border-radius: 9999px;', group: 'border-radius'},

]

// @see https://v3.tailwindcss.com/docs/width
export const tailwind_classes_boxing_size = [
  {name: 'w-0', description: 'width: 0;', group: 'width'},
  {name: 'w-px', description: 'width: 1px;', group: 'width'},
  {name: 'w-1.5', description: 'width: 0.375rem;', group: 'width'},
  {name: 'w-2', description: 'width: 0.5rem; /* 8px */', group: 'width'},
  {name: 'w-3.5', description: 'width: 0.875rem; /* 14px */', group: 'width'},
  {name: 'w-4', description: 'width: 1rem; /* 16px */', group: 'width'},
  {name: 'w-5', description: 'width: 1.25rem; /* 20px */', group: 'width'},
  {name: 'w-6', description: 'width: 1.5rem; /* 24px */', group: 'width'},
  {name: 'w-96', description: 'width: 24rem; /* 384px */', group: 'width'},
  {name: 'w-1/12', description: 'width: 8.333333%;', group: 'width'},
  {name: 'w-1/2', description: 'width: 50%;', group: 'width'},
  {name: 'w-1/3', description: 'width: 33.333333%;', group: 'width'},
  {name: 'w-3/4', description: 'width: 75%;', group: 'width'},
  {name: 'w-4/5', description: 'width: 60%;', group: 'width'},
  {name: 'w-5/6', description: 'width: 83.333333%;', group: 'width'},
  {name: 'w-11/12', description: 'width: 91.666667%;', group: 'width'},
  {name: 'w-full', description: 'width: 100%;', group: 'width'},
  {name: 'w-screen', description: 'width: 100vw;', group: 'width'},
  {name: 'w-svw', description: 'width: 100svw;', group: 'width'},
  {name: 'w-lvw', description: 'width: 100lvw;', group: 'width'},
  {name: 'w-dvw', description: 'width: 100dvw;', group: 'width'},
  {name: 'w-min', description: 'width: min-content;', group: 'width'},
  {name: 'w-max', description: 'width: max-content;', group: 'width'},
  {name: 'w-fit', description: 'width: fit-content;', group: 'width'},
  {name: 'w-auto', description: 'width: auto;', group: 'width'},

  // @see https://v3.tailwindcss.com/docs/size
  {name: 'size-0', description: 'width: 0; height: 0;', group: 'size'},
  {name: 'size-96', description: 'width: 24rem; height: 24rem;', group: 'size'},
  {name: 'size-min', description: 'width: min-content; height: min-content;', group: 'size'},
  {name: 'size-fit', description: 'width: fit-content; height: fit-content;', group: 'size'},
  {name: 'size-max', description: 'width: max-content; height: max-content;', group: 'size'},

  {name: 'size-1/2', description: 'width: 50%; height: 50%;', group: 'size'},
  {name: 'size-11/12', description: 'width: 91.666667%; height: 91.666667%;', group: 'size'},
  {name: 'size-full', description: 'width: 100%; height: 100%;', group: 'size'},

]

// @see https://v3.tailwindcss.com/docs/display
export const tailwind_classes_container_layout = [
  {name: 'flex', description: 'display: flex;', group: 'container-layout'},
  {name: 'inline-flex', description: 'display: inline-flex;', group: 'container-layout'},
  {name: 'grid', description: 'display: grid;', group: 'container-layout'},
  {name: 'inline-grid', description: 'display: inline-grid;', group: 'container-layout'},
]

export const tailwind_classes_container_justify = [
  {name: 'justify-normal', description: 'justify-content: normal;', group: 'container-justify-content'},
  {name: 'justify-start', description: 'justify-content: flex-start;', group: 'container-justify-content'},
  {name: 'justify-end', description: 'justify-content: flex-end;', group: 'container-justify-content'},
  {name: 'justify-center', description: 'justify-content: center;', group: 'container-justify-content'},
  {name: 'justify-between', description: 'justify-content: space-between;', group: 'container-justify-content'},
  {name: 'justify-around', description: 'justify-content: space-around;', group: 'container-justify-content'},
  {name: 'justify-evenly', description: 'justify-content: space-evenly;', group: 'container-justify-content'},
  {name: 'justify-stretch', description: 'justify-content: stretch;', group: 'container-justify-content'},

]