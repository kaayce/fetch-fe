import { ChevronsUpDown, Minus, Plus } from 'lucide-react'

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
  onClearSelection: () => void
  selectedItems: string[]
  items: string[]
}
export const BreedComboBox = ({
  onToggleSelection,
  onClearSelection,
  selectedItems,
  items,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const getDisplayText = () => {
    if (selectedItems.length > 1) {
      return `${selectedItems.length} breeds selected`
    }
    if (selectedItems.length === 1) {
      const selectedItem = items.find((f) => f === selectedItems[0])
      return selectedItem ?? 'Select Breed...'
    }
    return 'Select Breed...'
  }

  const displayText = getDisplayText()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-left font-bold">BREEDS</p>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-expanded={isOpen}
            className="justify-between"
            // className="w-[200px] justify-between"
          >
            {displayText}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm">{displayText}</span>
              <Button
                variant="outline"
                className="text-sm"
                onClick={onClearSelection}
              >
                Clear{' '}
              </Button>
            </div>
            <CommandInput placeholder="Search Breeds..." className="h-9" />
            <CommandList>
              <CommandEmpty>No Breeds found</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selectedItems.includes(item)
                  return (
                    <CommandItem
                      key={item}
                      value={item}
                      onSelect={() => onToggleSelection(item)}
                      className={cn(
                        'flex justify-between items-center cursor-pointer',
                        isSelected && 'text-purple-500'
                      )}
                    >
                      {item}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleSelection(item)
                        }}
                        className={cn(
                          'ml-auto p-1 rounded-full cursor-pointer transition-colors duration-200 size-6',
                          isSelected
                            ? 'bg-purple-300 text-white'
                            : 'text-gray-500'
                        )}
                      >
                        {isSelected ? (
                          <Minus size={6} className="text-muted" />
                        ) : (
                          <Plus size={6} className="text-muted" />
                        )}{' '}
                      </Button>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
