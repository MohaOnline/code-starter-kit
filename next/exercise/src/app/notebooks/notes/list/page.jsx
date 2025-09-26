'use client';

/**
 * 候选控件：
 * - https://github.com/jedwatson/react-select   ===   Material UI autocomplete
 */

import {useEffect, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ModeToggle from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, ChevronsUpDown, X, Square, CheckSquare } from 'lucide-react';

import Note from '../libs/Note';
import { ProcessingMask } from '@/app/lib/components/ProcessingMask';
import { NoteDialog } from "@/app/notebooks/notes/libs/NoteDialog";
import NavTop from '@/app/lib/components/NavTop';
import { useStatus } from '@/app/lib/atoms';

export default function Page() {

  const [status, setStatus] = useStatus();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTypeSubs, setSelectedTypeSubs] = useState([]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeSubOpen, setTypeSubOpen] = useState(false);

  // 加载所有 notes
  useEffect(() => {
    fetch('/api/notebooks/notes/list')
    .then(res => res.json())
    .then(json => {
        setStatus((prev) => ({
            ...prev,
            notes: json.notes,
        }))
    })
    .catch(err => {
        console.error('Fetch API error: /api/notebooks/notes/list');
        toast.error('cant load notes from API.');
    });    

  }, []);

  return (
    <div className="w-full">
      <NavTop />
      <h1 className="text-3xl font-bold text-center">
        Notes
      </h1>

      {/* 过滤工具栏 */}
      <div className="filter-toolbar flex items-center gap-4 mb-6 p-4 border rounded-lg bg-muted/50">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Type:</label>
          
          <Popover open={typeOpen} onOpenChange={setTypeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={typeOpen}
                className="w-[200px] justify-between"
              >
                {selectedTypes.length > 0
                  ? `${selectedTypes.length} selected`
                  : "Select types..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search types..." />
                <CommandList>
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    {Array.from(new Set(status.notes?.map(note => note.type).filter(Boolean))).map((type) => {
                      const isSelected = selectedTypes.includes(type)
                      return (
                        <CommandItem
                           key={type}
                           value={type}
                           onSelect={() => {
                             setSelectedTypes(prev => 
                               prev.includes(type)
                                 ? prev.filter(t => t !== type)
                                 : [...prev, type]
                             );
                           }}
                           className={isSelected ? "bg-accent" : ""}
                         >
                           <div className="flex items-center space-x-2">
                             {isSelected ? (
                               <CheckSquare className="h-4 w-4 text-primary" />
                             ) : (
                               <Square className="h-4 w-4 text-primary" />
                             )}
                             <span className={isSelected ? "font-medium" : ""}>
                               {type}
                             </span>
                           </div>
                         </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedTypes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedTypes.map((type) => (
                <div key={type} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  {type}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedTypes(prev => prev.filter(t => t !== type))}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
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
                {selectedTypeSubs.length > 0
                  ? `${selectedTypeSubs.length} selected`
                  : "Select sub types..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search sub types..." />
                <CommandList>
                  <CommandEmpty>No sub type found.</CommandEmpty>
                  <CommandGroup>
                    {Array.from(new Set(status.notes?.map(note => note.type_sub).filter(Boolean))).map((typeSub) => {
                      const isSelected = selectedTypeSubs.includes(typeSub)
                      return (
                        <CommandItem
                           key={typeSub}
                           value={typeSub}
                           onSelect={() => {
                             setSelectedTypeSubs(prev => 
                               prev.includes(typeSub)
                                 ? prev.filter(t => t !== typeSub)
                                 : [...prev, typeSub]
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
                             <span className={isSelected ? "font-medium" : ""}>
                               {typeSub}
                             </span>
                           </div>
                         </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedTypeSubs.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedTypeSubs.map((typeSub) => (
                <div key={typeSub} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  {typeSub}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedTypeSubs(prev => prev.filter(t => t !== typeSub))}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => {
            setSelectedTypes([]);
            setSelectedTypeSubs([]);
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* 笔记添加 */}
      <div className="operation text-right">
        <NoteDialog note={{}} />
      </div>

      <div className="notes flex flex-col gap-4">
        {status.notes
          ?.filter(note => {
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(note.type);
            const typeSubMatch = selectedTypeSubs.length === 0 || selectedTypeSubs.includes(note.type_sub);
            return typeMatch && typeSubMatch;
          })
          .map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </div>
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
      <div className="text-right"><ModeToggle /></div>
    </div>
  );
}