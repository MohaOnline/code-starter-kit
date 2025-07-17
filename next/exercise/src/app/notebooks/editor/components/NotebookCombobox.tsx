'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface NotebookOption {
  id: number;
  title: string;
  title_sub: string;
}

interface NotebookComboboxProps {
  notebooks: NotebookOption[];
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function NotebookCombobox({ notebooks, value, onChange }: NotebookComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedNotebook = notebooks.find((notebook) => notebook.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedNotebook
            ? `${selectedNotebook.title}${selectedNotebook.title_sub ? ` - ${selectedNotebook.title_sub}` : ''}`
            : "Select notebook..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white dark:bg-gray-800">
        <Command>
          <CommandInput placeholder="Search notebooks..." />
          <CommandList>
            <CommandEmpty>No notebook found.</CommandEmpty>
            <CommandGroup>
              {notebooks.map((notebook) => (
                <CommandItem
                  key={notebook.id}
                  value={`${notebook.title} ${notebook.title_sub || ''}`}
                  onSelect={() => {
                    onChange(notebook.id === value ? undefined : notebook.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === notebook.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{notebook.title}</span>
                    {notebook.title_sub && (
                      <span className="text-sm text-muted-foreground">
                        {notebook.title_sub}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}