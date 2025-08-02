"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const people = [
  { id: 1, name: "张三", avatar: "🧑" },
  { id: 2, name: "李四", avatar: "👩" },
  { id: 3, name: "王五", avatar: "🧔" },
  { id: 4, name: "赵六", avatar: "👨" },
  { id: 5, name: "钱七", avatar: "👱" },
];

type Person = typeof people[0];

/**
 * Headless UI Listbox（列表框）组件示例
 * 
 * Listbox 组件是一个可访问的选择列表，支持单选和多选功能
 * @see https://headlessui.com/react/listbox
 */
export default function ListboxExample() {
  // 单选状态
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  // 多选状态
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([people[0]]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">基础列表框（单选）</h2>
        <div className="w-72">
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
                <span className="flex items-center truncate">
                  <span className="mr-2">{selectedPerson.avatar}</span>
                  {selectedPerson.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"}`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`flex items-center truncate ${selected ? "font-medium" : "font-normal"}`}
                          >
                            <span className="mr-2">{person.avatar}</span>
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">多选列表框</h2>
        <div className="w-72">
          <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
                <span className="block truncate">
                  {selectedPeople.length === 0
                    ? "请选择..."
                    : `已选择 ${selectedPeople.length} 项`}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"}`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`flex items-center truncate ${selected ? "font-medium" : "font-normal"}`}
                          >
                            <span className="mr-2">{person.avatar}</span>
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* 显示多选结果 */}
        {selectedPeople.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">已选择的人员：</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedPeople.map((person) => (
                <span 
                  key={person.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {person.avatar} {person.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">使用说明</h2>
        <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-sm">
          <p className="mb-2">• 点击列表框按钮打开选项</p>
          <p className="mb-2">• 支持键盘导航：Tab 聚焦列表框，Enter/Space 打开列表</p>
          <p className="mb-2">• 打开后可使用上下键选择项目，Enter 选中</p>
          <p className="mb-2">• 多选模式下，可以选择多个项目</p>
          <p className="mb-2">• Listbox 提供了 active 和 selected 状态用于自定义样式</p>
          <p>• 自动处理可访问性属性，如 aria-* 属性</p>
        </div>
      </div>
    </div>
  );
}
