"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

/**
 * Headless UI Dialog（对话框）组件示例
 * 
 * Dialog 组件是一个可访问的模态对话框，支持键盘交互和焦点管理
 * @see https://headlessui.com/react/dialog
 */
export default function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeSecondModal() {
    setIsSecondOpen(false);
  }

  function openSecondModal() {
    setIsSecondOpen(true);
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">基础对话框</h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            打开简单对话框
          </button>

          <button
            type="button"
            onClick={openSecondModal}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            打开带动画对话框
          </button>
        </div>
      </div>

      {/* 基础对话框 */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              基础对话框示例
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                这是一个基本的对话框示例。对话框在打开时会捕获焦点，可以通过点击背景、按下 Esc 键或点击关闭按钮来关闭。
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                关闭
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* 带动画的对话框 */}
      <Transition appear show={isSecondOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeSecondModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      带动画的对话框
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
                      onClick={closeSecondModal}
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      这个对话框使用 Transition 组件添加了平滑的过渡动画效果。
                      动画包括淡入淡出和缩放效果，提升了用户体验。
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700">请确认你的操作：</p>
                    <div className="mt-4 flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        onClick={closeSecondModal}
                      >
                        确认
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        onClick={closeSecondModal}
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">使用说明</h2>
        <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-sm">
          <p className="mb-2">• 点击按钮打开对应的对话框</p>
          <p className="mb-2">• 对话框打开时会自动锁定焦点在对话框内</p>
          <p className="mb-2">• 按 Esc 键或点击背景可关闭对话框</p>
          <p className="mb-2">• 第二个对话框使用 Transition 组件添加了平滑的动画效果</p>
          <p>• 对话框遵循 WAI-ARIA 对话框模式，确保可访问性</p>
        </div>
      </div>
    </div>
  );
}
