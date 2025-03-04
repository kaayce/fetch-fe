import { Input } from './ui/input'
import { Label } from './ui/label'

export const ZipCodeSearch = () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="zip-code" className="font-bold">
        ZIP CODE
      </Label>
      <Input type="email" id="zip-code" placeholder="Enter ZIP Code" />
    </div>
  )
}
