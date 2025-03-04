import { Outlet, Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { APP_NAME, REPO_URL } from './lib/constants'
import { useFavourites } from './hooks/useFavourite'
import FavouritesIndicator from './components/FavouritesIndicator'
import { Toaster } from 'sonner'

export default function Layout() {
  const { isAuthenticated, signOut } = useAuth()
  const { favourites } = useFavourites()

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[1400] mx-auto">
      {/* Header */}
      <header className="w-full py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex gap-4 items-center">
            <img src="/logo.svg" alt="logo" className="h-10 w-10" />
            <p className="text-lg font-semibold">{APP_NAME}</p>
          </Link>
          {isAuthenticated && (
            <div className="flex gap-4 items-center">
              <FavouritesIndicator favourites={favourites} />
              <Button onClick={signOut} className="cursor-pointer">
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center w-full px-4 py-10">
        <div className="max-w-7xl">
          <Outlet />
          <Toaster />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full shadow-md py-3">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>
            Made with ❤️ |{' '}
            <Link
              to={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition"
            >
              Source Code
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
