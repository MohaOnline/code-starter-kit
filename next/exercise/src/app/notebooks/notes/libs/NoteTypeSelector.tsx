import { useState } from 'react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

import { useStatus } from '@/app/lib/atoms';

export function NoteTypeSelector({ types }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useStatus();

  const handleSelect = (type) => {
    setSelected(type);
    setStatus((prev) => ({
      ...prev,
      type: type,
    }))
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-between">
          {selected ? `${selected.title}: ${selected.title_sub} (${selected.id})` : '选择笔记类型'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="笔记类型..." />
          <CommandList>
            {types.map((type) => (
              <CommandItem key={type.id} onSelect={() => handleSelect(type)}>
                {`${type.title}: ${type.title_sub} (${type.id})`}
                {selected?.id === type.id && <Check className="ml-auto h-4 w-4" />}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
