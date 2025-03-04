import { matchDogsByIds } from '@/api/dog'
import { DAY, PATHS } from '@/lib/constants'
import sessionStorageInstance from '@/lib/storage'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export const useMatch = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: matchDogsByIds,
    onSuccess: (data) => {
      toast.info(`Matching...`)

      sessionStorageInstance.setValue<string>('match', data.match, DAY)
      navigate(PATHS.MATCH)
    },
  })
}
