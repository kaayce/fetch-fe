import type { DogWithLocation, FavouriteDog } from '@/api/dog.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { Heart, CircleEllipsis } from 'lucide-react'
import { Button } from './ui/button'

type Props = {
  dog: DogWithLocation
  isFavorite: boolean
  onToggleFavorite: (dogId: FavouriteDog) => void
}

const DogCard = ({ dog, isFavorite, onToggleFavorite }: Props) => {
  const { age, breed, name, img, zip_code, location } = dog
  return (
    <Card className="relative p-0 gap-0 pb-3">
      {/* Image */}
      <div className="bg-white rounded-t-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <img
          src={img}
          alt={name}
          className="w-full h-48 object-cover aspect-[6/4]"
        />

        {/* Favorite Btn */}
        <button
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition cursor-pointer"
          onClick={() => onToggleFavorite(dog)}
        >
          <Heart
            className={`h-6 w-6 text-purple-600 ${
              isFavorite ? 'fill-purple-500' : 'fill-white'
            }`}
          />
        </button>
      </div>

      {/* Dog Details */}
      <CardHeader className="text-center p-1">
        <CardTitle className="text-lg font-semibold text-purple-600">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-left text-gray-600 text-sm px-2">
        <div className="flex items-center justify-between align-middle">
          <h5 className="text-sm font-medium self-center">{breed}</h5>
          <span className="bg-muted text-black text-xs font-semibold px-2 py-1 rounded-lg text-center">
            {age} {age > 1 ? 'yrs' : 'yr'}
          </span>
        </div>
        <div className="flex items-center justify-between align-middle">
          <span className="text-sm font-semibold">zip: {zip_code}</span>
          {/* Location */}
          {location && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <CircleEllipsis className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="end"
                className="w-42 bg-white shadow-lg rounded-lg border p-3"
              >
                <div className="flex flex-col gap-1 text-gray-700">
                  <p className="text-sm font-semibold">📍 Location Details</p>
                  <p className="text-sm">
                    City: <span className="font-medium">{location.city}</span>
                  </p>
                  <p className="text-sm">
                    State: <span className="font-medium">{location.state}</span>
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default DogCard
