import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';

export function Panel({ title = 'Panel Title', children }) {
  const { theme } = useNextTheme();

  return (
    <div className="relative mt-4 border dark:border-gray-700 dark:hover:border-inherit border-gray-300 hover:border-black rounded-md p-4 ">
      {/* 标题 */}
      <span className="absolute -top-3 left-3 px-2 dark:text-gray-400 text-gray-600 dark:bg-black bg-white text-sm">
        {title}
      </span>

      {/* 内容区域 */}
      <div className="">
        {children}
      </div>
    </div>
  );
}
