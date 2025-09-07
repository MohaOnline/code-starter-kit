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
  {name: 'align-baseline', description: 'vertical-align: baseline;'},
  {name: 'align-top', description: 'vertical-align: top;'},
  {name: 'align-middle', description: 'vertical-align: middle;'},
  {name: 'align-bottom', description: 'vertical-align: bottom;'},
  {name: 'align-text-top', description: 'vertical-align: text-top;'},
  {name: 'align-text-bottom', description: 'vertical-align: text-bottom;'},
  {name: 'align-sub', description: 'vertical-align: sub;'},
  {name: 'align-super', description: 'vertical-align: super;'},
  {name: 'align-[4px]', description: ''}
]