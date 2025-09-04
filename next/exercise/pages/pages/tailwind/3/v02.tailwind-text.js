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

export const tailwind_classes_text_align = [
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
  'text-start',
  'text-end',
];


export const tailwind_classes_text_weight = [
  'font-thin',
  'font-extralight',
  'font-light',
  'font-normal',
  'font-medium',
  'font-semibold',
  'font-bold',
  'font-extrabold',
]

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
