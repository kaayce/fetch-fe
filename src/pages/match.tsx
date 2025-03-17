import type { DogWithLocation } from '@/api/dog.types'
import DogMatchCard from '@/components/DogMatchCard'
import { useAuth } from '@/hooks/useAuth'
import { PATHS } from '@/lib/constants'
import sessionStorageInstance from '@/lib/storage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const MatchPage = () => {
  const matchedDog = sessionStorageInstance.getValue<DogWithLocation>('match')

  const navigate = useNavigate()

  const { user } = useAuth()

  useEffect(() => {
    if (!matchedDog) {
      navigate(PATHS.HOME)
    }
    return () => {
      if (window.location.pathname !== PATHS.MATCH) {
        sessionStorageInstance.removeValue('match')
      }
    }
  }, [matchedDog, navigate])

  if (!matchedDog) return null

  return (
    <div className="flex flex-col items-center space-y-8 h-full">
      <div>
        <h1 className="text-center text-2xl font-bold">
          Congratulations {user?.name}!
        </h1>
        <p className="text-center">You have successfully matched with a dog.</p>
      </div>
      <DogMatchCard dog={matchedDog} />
    </div>
  )
}

export default MatchPage
