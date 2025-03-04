import { fetchDogsByIds } from '@/api/dog'
import { useQuery } from '@tanstack/react-query'

export const useFetchDogsById = ({
  ids,
  enabled,
}: {
  ids: string[]
  enabled?: boolean
}) => {
  const { data: dogs = [], isLoading: dogsLoading } = useQuery({
    queryKey: ['fetchDogsByIds', ids],
    queryFn: () => fetchDogsByIds(ids),
    enabled,
  })
  return { dogs, dogsLoading }
}
