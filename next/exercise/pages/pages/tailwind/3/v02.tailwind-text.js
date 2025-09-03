export const tailwind_classes_text_smoothing = [
  {value: 'antialiased', meaning: 'grayscale antialiasing 灰度抗锯齿'},
  {value: 'hover:antialiased'},
  {value: 'subpixel-antialiased', meaning: 'subpixel antialiasing 子像素抗锯齿'},
  {value: 'md:subpixel-antialiased', meaning: '在中等屏幕尺寸及以上应用 subpixel antialiasing 子像素抗锯齿'}
]

export const tailwind_classes_text_color = [
  'text-orange-100',
  'text-orange-200',
];

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
  {value: 'uppercase'},
  {value: 'lowercase'},
  {value: 'capitalize'},
  {value: 'normal-case'},
  {value: 'lg:normal-case', meaning: '在大屏还原大小写'},
]