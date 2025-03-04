import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { MAX_DOG_AGE } from '@/lib/constants'

type Props = {
  range: [number, number]
  onSliderChange: (value: number) => void
} & React.ComponentProps<typeof Slider>

export function AgeSlider({
  className,
  range,
  onSliderChange,
  ...props
}: Props) {
  const [from, to] = range
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-left font-bold">AGE</p>
      <Slider
        max={MAX_DOG_AGE}
        value={[to]}
        onValueChange={(v) => onSliderChange(v[0])}
        className={cn(className)}
        {...props}
      />
      <div className="flex justify-between text-sm">
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </div>
  )
}
