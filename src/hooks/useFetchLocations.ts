import { fetchLocationsByZipCodes } from '@/api/location'
import { useQuery } from '@tanstack/react-query'

export const useFetchLocations = ({
  zipCodes,
  enabled,
}: {
  zipCodes: string[]
  enabled?: boolean
}) => {
  const { data: locations = [], isLoading: locationsLoading } = useQuery({
    queryKey: ['fetchLocationsByZipCodes', zipCodes],
    queryFn: () => fetchLocationsByZipCodes(zipCodes),
    enabled,
  })

  return {
    locations,
    locationsLoading,
  }
}
