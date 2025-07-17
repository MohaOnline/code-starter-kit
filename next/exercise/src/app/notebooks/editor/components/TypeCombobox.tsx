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

interface TypeOption {
  id: number;
  title: string;
  title_sub: string;
}

interface TypeComboboxProps {
  types: TypeOption[];
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function TypeCombobox({ types, value, onChange }: TypeComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedType = types.find((type) => type.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedType
            ? `${selectedType.title}${selectedType.title_sub ? ` - ${selectedType.title_sub}` : ''}`
            : "Select type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white dark:bg-gray-800">
        <Command>
          <CommandInput placeholder="Search types..." />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              {types.map((type) => (
                <CommandItem
                  key={type.id}
                  value={`${type.title} ${type.title_sub || ''}`}
                  onSelect={() => {
                    onChange(type.id === value ? undefined : type.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === type.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{type.title}</span>
                    {type.title_sub && (
                      <span className="text-sm text-muted-foreground">
                        {type.title_sub}
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