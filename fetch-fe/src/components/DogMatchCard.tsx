import type { DogWithLocation } from '@/api/dog.types'
import { Card } from '@/components/ui/card'
import { cn, haversine, toMiles } from '@/lib/utils'
import { Badge } from './ui/badge'
import { useState } from 'react'
import type { Coordinates } from '@/api/location.types'
import { toast } from 'sonner'
import { Button } from './ui/button'

type Props = {
  dog: DogWithLocation
}

export const DogMatchCard = ({ dog }: Props) => {
  const [distanceMiles, setDistanceMiles] = useState<null | number>(null)
  const { age, breed, name, img, zip_code, location } = dog

  const getDistance = () => {
    if (!location) {
      console.error('Location not found')
      toast.error('Location not found')
      return
    }

    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.')
      toast.error('Geolocation is not supported by this browser.')
      return
    }

    const dogCoords: Coordinates = {
      lat: location.latitude,
      lon: location.longitude,
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords: Coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        setDistanceMiles(toMiles(haversine(userCoords, dogCoords)))
      },
      (error) => {
        console.error('Error getting user location:', error.message)
        toast.error(`Error getting user location: ${error.message}`)
      }
    )
  }

  return (
    <Card className="max-w-2xl shadow-lg animate-scale-in">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="relative aspect-square overflow-hidden rounded-md">
          <img
            src={img}
            alt={name}
            className={cn(
              'object-cover w-full h-full rounded-md transition-opacity duration-500'
            )}
          />
        </div>

        {/* Dog Details */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-purple-600">{name}</h2>
            <Badge>
              {age} {age === 1 ? 'year' : 'years'} old
            </Badge>
          </div>

          <div className="space-y-4">
            <DetailItem label="Breed" value={breed} />
            <DetailItem
              label="Location"
              value={`${location?.city}, ${location?.state}`}
            />
            <DetailItem label="Zip Code" value={zip_code} />

            {!distanceMiles && (
              <Button
                onClick={getDistance}
                className="mt-2 cursor-pointer transition-all"
              >
                See Distance from your location
              </Button>
            )}
            {distanceMiles && (
              <DetailItem
                label="Distance"
                value={`${distanceMiles.toFixed(0)} miles`}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

const DetailItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
      <p className="text-sm">{value}</p>
    </div>
  )
}

export default DogMatchCard
