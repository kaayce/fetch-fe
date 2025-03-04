import type { SortField } from '@/api/dog.types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  onSortChange: (option: SortField) => void
  sortOptions: Record<SortField, string>
  selectedSort?: SortField
}

export const SortDropdown = ({
  selectedSort,
  sortOptions,
  onSortChange,
}: Props) => {
  return (
    <Select value={selectedSort} onValueChange={onSortChange}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Sort By..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By...</SelectLabel>
          {Object.entries(sortOptions).map(([sortField, displayValue]) => (
            <SelectItem key={sortField} value={sortField}>
              {displayValue}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
