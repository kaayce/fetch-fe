import type { Dog } from '@/api/dog.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'

type Props = {
  dog: Dog
  isFavorite: boolean
  onToggleFavorite: (dogId: string) => void
}

const DogCard = ({
  dog: { id, age, breed, name, img },
  isFavorite,
  onToggleFavorite,
}: Props) => {
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
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
          onClick={() => onToggleFavorite(id)}
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

      <CardContent className="text-left text-gray-600 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">{breed}</span>
          <span className="bg-muted text-black text-xs font-semibold px-2 py-1 rounded-lg">
            {age} {age > 1 ? 'years' : 'year'}
          </span>
        </div>
        {/* <p className="mt-1 text-gray-500">Location: Paris</p> */}
      </CardContent>
    </Card>
  )
}

export default DogCard
