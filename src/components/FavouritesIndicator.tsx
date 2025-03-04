import type { FavouriteDog } from '@/api/dog.types'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip'
import { Heart } from 'lucide-react'

type Props = {
  favourites: FavouriteDog[]
}

const FavouritesIndicator = ({ favourites }: Props) => {
  const isFilled = favourites.length > 0
  const favouritesCount = favourites.length

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex relative">
            <Heart
              className={`h-6 w-6 transition ${
                isFilled ? 'text-purple-500 fill-purple-500' : 'text-gray-400'
              }`}
            />
            {favouritesCount > 0 && (
              <span className="absolute text-xxs text-muted-foreground top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1">
                {favouritesCount}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={5}>
          <p>
            {favouritesCount > 0
              ? `You have ${favouritesCount} Favourites added`
              : 'No favourites yet'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default FavouritesIndicator
