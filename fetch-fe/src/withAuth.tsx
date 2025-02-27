import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, type ComponentProps, type ComponentType } from 'react'

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return (props: ComponentProps<typeof Component>) => {
    const { authenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (!authenticated) {
        navigate('/login')
      }
    }, [authenticated, navigate])

    if (!authenticated) {
      return null
    }

    return <Component {...props} />
  }
}

export default withAuth
