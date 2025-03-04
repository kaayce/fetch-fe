import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SelectDropdownProps = {
  onChange: (v: string) => void
  placeholder?: string
  value: string
  options: string[]
  className?: string
}

export const SelectDropdown = ({
  onChange,
  value,
  options,
  placeholder,
  className,
}: SelectDropdownProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {options.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
