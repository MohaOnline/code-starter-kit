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
      note: {
        ...prev.note,
        type: type,
      },
    }))
    setOpen(false);
  };

  return (
    // modal={true} 必须，否则鼠标滚动无效：https://github.com/shadcn-ui/ui/discussions/4175
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-between">
          {status.note?.type?.id
            ? `${status.note?.type?.title} : ${status.note?.type?.title_sub} (${status.note?.type?.id})`
            : '笔记类型 ...'}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="笔记类型..." />
          <CommandList className={'max-h-[300px] overflow-y-auto'}>
            {types.map((type) => (
              <CommandItem key={type.id} onSelect={() => handleSelect(type)}>
                {`${type.title} : ${type.title_sub} (${type.id})`}

                {status.note?.type?.id === type.id &&
                  <Check className="ml-auto h-4 w-4"/>}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
