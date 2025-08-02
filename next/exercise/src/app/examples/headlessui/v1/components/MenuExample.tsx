"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

/**
 * Headless UI Menu（下拉菜单）组件示例
 * 
 * Menu 组件是一个可访问的下拉菜单，支持键盘导航和焦点管理
 * @see https://headlessui.com/react/menu
 */
export default function MenuExample() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">基础下拉菜单</h2>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              选项
              <ChevronDown
                className="ml-2 -mr-1 h-5 w-5 text-indigo-200 hover:text-indigo-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      编辑
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      复制
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      存档
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item disabled>
                  {({ active, disabled }) => (
                    <button
                      className={`${
                        active ? "bg-indigo-500 text-white" : "text-gray-900"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      disabled={disabled}
                    >
                      移动（禁用）
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-red-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      删除
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">使用说明</h2>
        <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-sm">
          <p className="mb-2">• 点击菜单按钮打开下拉菜单</p>
          <p className="mb-2">• 支持键盘导航：Tab 聚焦菜单，Enter/Space 打开菜单</p>
          <p className="mb-2">• 打开后可使用上下键选择项目，Enter 选中</p>
          <p className="mb-2">• Esc 键关闭菜单</p>
          <p className="mb-2">• 通过 active 状态来设置悬停/聚焦样式</p>
          <p>• 支持禁用菜单项</p>
        </div>
      </div>
    </div>
  );
}
