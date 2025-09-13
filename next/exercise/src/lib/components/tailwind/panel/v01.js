export function Panel({title = 'Panel Title', children}) {

  return (
    <div className="relative mt-4 border border-sky-600 rounded-md p-4 ">
      {/* 标题 */}
      <span className="absolute -top-3 left-3 px-2 text-sky-600 bg-white text-sm">
        {title}
      </span>

      {/* 内容区域 */}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}
