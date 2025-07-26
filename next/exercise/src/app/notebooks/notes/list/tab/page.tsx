"use client";

/**
 * Notes List Tab 页面 - 基于 tab 的 type 过滤
 * Notes List Tab Page - Type filtering based on tabs
 *
 * 功能特性 / Features:
 * - 右侧 tab 面板显示所有 type / Right tab panel showing all types
 * - 点击 tab 过滤对应 type 的 notes / Click tab to filter notes by type
 * - 保留 sub type 下拉过滤器 / Keep sub type dropdown filter
 * - 响应式布局设计 / Responsive layout design
 */

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, X, Square, CheckSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Note from "../../libs/Note";
import { ProcessingMask } from "@/app/lib/components/ProcessingMask";
import { NoteDialog } from "@/app/notebooks/notes/libs/NoteDialog";
import NavTop from "@/app/lib/components/NavTop";
import { useStatus } from "@/app/lib/atoms";

// 笔记数据接口 / Note data interface
interface NoteData {
  id: string;
  type: string;
  type_sub: string;
  title: string;
  body: string;
  [key: string]: any;
}

export default function NotesListTabPage() {
  // 全局状态管理 / Global state management
  const [status, setStatus] = useStatus();

  // 本地状态 / Local state
  const [selectedType, setSelectedType] = useState<string>("all"); // 当前选中的 type tab
  const [selectedTypeSubs, setSelectedTypeSubs] = useState<string[]>([]); // 选中的 sub types
  const [typeSubOpen, setTypeSubOpen] = useState(false); // sub type 下拉框状态
  const [availableTypes, setAvailableTypes] = useState<string[]>([]); // 可用的 types

  // 加载所有 notes 数据 / Load all notes data
  useEffect(() => {
    console.log("🔄 [NotesListTab] useEffect triggered - fetching notes data");
    fetch("/api/notebooks/notes/list")
      .then(res => res.json())
      .then(json => {
        console.log("📥 [NotesListTab] Notes data received:", json.notes?.length, "notes");

        setStatus(prev => ({
          ...prev,
          notes: json.notes,
        }));

        // 提取所有唯一的 types / Extract all unique types
        const types = Array.from(new Set(json.notes?.map((note: NoteData) => note.type).filter(Boolean))) as string[];
        console.log("🏷️ [NotesListTab] Extracted types:", types);
        console.log("🎯 [NotesListTab] Current selectedType before update:", selectedType);

        setAvailableTypes(types);

        // 设置默认选中第一个 type / Set default selected type
        if (types.length > 0 && selectedType === "all") {
          console.log("🔧 [NotesListTab] Setting default selectedType to:", types[0]);
          setSelectedType(types[0] as string);
        } else {
          console.log(
            "⚠️ [NotesListTab] Not setting default type. Current selectedType:",
            selectedType,
            "Types available:",
            types.length > 0
          );
        }
      })
      .catch(err => {
        console.error("❌ [NotesListTab] Fetch API error: /api/notebooks/notes/list", err);
        toast.error("无法从 API 加载笔记数据 / Cannot load notes from API.");
      });
  }, [setStatus]);

  // 监听 selectedType 变化 / Monitor selectedType changes
  useEffect(() => {
    console.log('🎯 [NotesListTab] selectedType changed to:', selectedType);
  }, [selectedType]);

  // 监听 availableTypes 变化 / Monitor availableTypes changes
  useEffect(() => {
    console.log("🏷️ [NotesListTab] availableTypes changed to:", availableTypes);
  }, [availableTypes]);

  // 根据当前选中的 type 和 sub types 过滤 notes / Filter notes based on selected type and sub types
  const filteredNotes =
    status.notes?.filter((note: NoteData) => {
      // Type 过滤 (通过 tab 控制) / Type filtering (controlled by tab)
      const typeMatch = selectedType === "all" || note.type === selectedType;

      // Sub Type 过滤 / Sub type filtering
      const typeSubMatch = selectedTypeSubs.length === 0 || selectedTypeSubs.includes(note.type_sub);

      return typeMatch && typeSubMatch;
    }) || [];

  // 获取当前 type 下可用的 sub types / Get available sub types for current type
  const availableSubTypes = Array.from(
    new Set(
      status.notes
        ?.filter((note: NoteData) => selectedType === "all" || note.type === selectedType)
        ?.map((note: NoteData) => note.type_sub)
        ?.filter(Boolean)
    )
  );

  // 计算每个 type 的 note 数量 / Calculate note count for each type
  const getTypeCount = (type: string) => {
    if (type === "all") {
      return status.notes?.length || 0;
    }
    return status.notes?.filter((note: NoteData) => note.type === type).length || 0;
  };

  // 清除 sub type 过滤器 / Clear sub type filters
  const clearSubTypeFilters = () => {
    setSelectedTypeSubs([]);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <NavTop />

      {/* 页面标题 / Page title */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Notes - Tab View</h1>

        {/* 主体布局：左侧内容 + 右侧 Tab 面板 / Main layout: Left content + Right tab panel */}
        <div className="flex gap-6">
          {/* 左侧内容区域 / Left content area */}
          <div className="flex-1">
            {/* Sub Type 过滤器 / Sub type filter */}
            <div className="filter-toolbar flex items-center gap-4 mb-6 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Sub Type:</label>

                <Popover open={typeSubOpen} onOpenChange={setTypeSubOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={typeSubOpen}
                      className="w-[200px] justify-between"
                    >
                      {selectedTypeSubs.length > 0 ? `${selectedTypeSubs.length} selected` : "Select sub types..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search sub types..." />
                      <CommandList>
                        <CommandEmpty>No sub type found.</CommandEmpty>
                        <CommandGroup>
                          {availableSubTypes.map(typeSub => {
                            const isSelected = selectedTypeSubs.includes(typeSub);
                            return (
                              <CommandItem
                                key={typeSub}
                                value={typeSub}
                                onSelect={() => {
                                  setSelectedTypeSubs(prev =>
                                    prev.includes(typeSub) ? prev.filter(t => t !== typeSub) : [...prev, typeSub]
                                  );
                                }}
                                className={isSelected ? "bg-accent" : ""}
                              >
                                <div className="flex items-center space-x-2">
                                  {isSelected ? (
                                    <CheckSquare className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Square className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span className={isSelected ? "font-medium" : ""}>{typeSub}</span>
                                </div>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* 已选中的 sub types 标签 / Selected sub types tags */}
                {selectedTypeSubs.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedTypeSubs.map(typeSub => (
                      <div
                        key={typeSub}
                        className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                      >
                        {typeSub}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setSelectedTypeSubs(prev => prev.filter(t => t !== typeSub))}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 清除过滤器按钮 / Clear filters button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSubTypeFilters}
                  disabled={selectedTypeSubs.length === 0}
                >
                  Clear Sub Filters
                </Button>
              </div>
            </div>

            {/* 笔记添加按钮 / Add note button */}
            <div className="operation text-right mb-4">
              <NoteDialog note={null} />
            </div>

            {/* 笔记列表 / Notes list */}
            <div className="notes flex flex-col gap-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note: NoteData) => <Note key={note.id} note={note} />)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No notes found for the selected filters.</p>
                  <p className="text-sm mt-2">
                    {selectedType !== "all" && `Type: ${selectedType}`}
                    {selectedTypeSubs.length > 0 && ` | Sub Types: ${selectedTypeSubs.join(", ")}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 右侧 Type Tab 面板 / Right type tab panel */}
          <div className="w-80 border-l pl-6">
            <div className="sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Filter by Type</h3>

              <Tabs
                value={selectedType}
                onValueChange={value => {
                  console.log("🔄 [NotesListTab] Tab change triggered:", value, "-> from:", selectedType);
                  setSelectedType(value);
                  console.log("✅ [NotesListTab] Tab change completed, new selectedType should be:", value);
                }}
                orientation="vertical"
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-1 h-auto gap-1 bg-muted p-1">
                  {/* 全部 tab / All tab */}
                  <TabsTrigger
                    value="all"
                    className="w-full justify-between data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    <span>All Types</span>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                      {getTypeCount("all")}
                    </span>
                  </TabsTrigger>

                  {/* 各个 type tabs / Individual type tabs */}
                  {availableTypes.map(type => (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="w-full justify-between data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                      <span className="truncate">{type}</span>
                      <span className="ml-2 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                        {getTypeCount(type)}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* 当前过滤状态信息 / Current filter status info */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
                <div className="font-medium mb-2">Current Filter:</div>
                <div className="space-y-1">
                  <div>
                    Type: <span className="font-mono">{selectedType === "all" ? "All Types" : selectedType}</span>
                  </div>
                  <div>
                    Sub Types:{" "}
                    <span className="font-mono">
                      {selectedTypeSubs.length > 0 ? selectedTypeSubs.join(", ") : "All"}
                    </span>
                  </div>
                  <div>
                    Results: <span className="font-mono text-primary">{filteredNotes.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 全局组件 / Global components */}
      <ProcessingMask />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* 主题切换按钮 / Theme toggle button */}
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
