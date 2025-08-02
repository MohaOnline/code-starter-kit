import DialogExample from "./components/DialogExample";
import ListboxExample from "./components/ListboxExample";
import MenuExample from "./components/MenuExample";

/**
 * Headless UI 示例页面
 * 
 * 本页面展示了 Headless UI 库的基本使用方法，包括常见组件的实现和定制
 * Headless UI 是一个完全无样式的、可访问的 UI 组件库，专为与 Tailwind CSS 集成而设计
 */
export default function HeadlessUIExamplesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Headless UI 基本使用示例</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Headless UI 是一个完全无样式的、可访问的 UI 组件库，专为与 Tailwind CSS 集成而设计。
          以下示例展示了常见组件的基本用法和自定义方式。
        </p>
      </header>

      <div className="space-y-16">
        <section id="menu" className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Menu 下拉菜单</h2>
            <p className="text-gray-600">可访问的下拉菜单组件，支持键盘导航和焦点管理</p>
          </div>
          <MenuExample />
        </section>

        <section id="dialog" className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Dialog 对话框</h2>
            <p className="text-gray-600">可访问的模态对话框组件，支持键盘交互和焦点管理</p>
          </div>
          <DialogExample />
        </section>

        <section id="listbox" className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Listbox 列表框</h2>
            <p className="text-gray-600">可访问的选择列表组件，支持单选和多选功能</p>
          </div>
          <ListboxExample />
        </section>
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>了解更多关于 Headless UI 的信息，请访问 <a href="https://headlessui.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline">headlessui.com</a></p>
      </footer>
    </div>
  );
}
