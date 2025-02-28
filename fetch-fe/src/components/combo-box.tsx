import { ChevronsUpDown, Plus } from 'lucide-react'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props = {
  onToggleSelection: (id: string) => void
  selectedItems: string[]
  items: string[]
}
export function ComboBox({ onToggleSelection, selectedItems, items }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const getDisplayText = () => {
    if (selectedItems.length > 1) {
      return `${selectedItems.length} items selected`
    }
    if (selectedItems.length === 1) {
      const selectedItem = items.find((f) => f === selectedItems[0])
      return selectedItem ?? 'Select Breed...'
    }
    return 'Select Breed...'
  }

  const displayText = getDisplayText()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {displayText}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Breeds..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Breeds found</CommandEmpty>
            <CommandGroup>
              {items.map((item) => {
                const isSelected = selectedItems.includes(item)
                return (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => onToggleSelection(item.id)}
                    className={cn(
                      'flex justify-between items-center',
                      isSelected && 'text-purple-500'
                    )}
                  >
                    {item.id}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleSelection(item.id)
                      }}
                      className={cn(
                        'ml-auto p-1 rounded',
                        isSelected ? 'text-purple-500' : 'text-gray-500'
                      )}
                    >
                      <Plus size={16} />
                    </button>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
