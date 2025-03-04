import DogMatchCard from '@/components/DogMatchCard'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'
import { useFetchDogsById } from '@/hooks/useFetchDogsById'
import { useFetchLocations } from '@/hooks/useFetchLocations'
import { PATHS } from '@/lib/constants'
import sessionStorageInstance from '@/lib/storage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Match = () => {
  const match = sessionStorageInstance.getValue<string>('match')

  const navigate = useNavigate()

  const { user } = useAuth()
  const { dogs, dogsLoading } = useFetchDogsById({
    ids: match ? [match] : [],
    enabled: !!match,
  })

  const { locations, locationsLoading } = useFetchLocations({
    zipCodes: dogs.map((d) => d.zip_code),
    enabled: !dogsLoading,
  })

  useEffect(() => {
    if (!match) {
      navigate(PATHS.HOME)
    }
    return () => {
      if (window.location.pathname !== PATHS.MATCH) {
        sessionStorageInstance.removeValue('match')
      }
    }
  }, [match, navigate])

  const dogWithLocation = {
    ...dogs[0],
    location: locations[0],
  }

  console.log({ dogs, locations })

  const isLoading = dogsLoading || locationsLoading
  return (
    <div className="flex flex-col items-center space-y-8 h-full">
      <div>
        <h1 className="text-center text-2xl font-bold">
          Congratulations {user?.name}!
        </h1>
        <p className="text-center">You have successfully matched with a dog.</p>
      </div>
      {isLoading ? (
        <DogMatchCardSkeleton />
      ) : (
        <DogMatchCard dog={dogWithLocation} />
      )}
    </div>
  )
}

const DogMatchCardSkeleton = () => {
  return (
    <Card className="relative p-0 gap-0 pb-3 max-w-sm w-full">
      <Skeleton className="w-full h-48" />

      {/* Dog Details Skeleton */}
      <CardHeader className="text-center p-1">
        <Skeleton className="w-24 h-6" />
      </CardHeader>

      <CardContent className="text-left text-gray-600 text-sm px-2">
        <div className="flex gap-4">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-12 h-6 rounded-lg" />
          <Skeleton className="w-12 h-6 rounded-lg" />
          <Skeleton className="w-12 h-6 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

export default Match
