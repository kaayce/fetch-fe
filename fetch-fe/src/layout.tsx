import { Outlet, Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { APP_NAME, REPO_URL } from './lib/constants'

export default function Layout() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[1280px] mx-auto">
      {/* Header */}
      <header className="w-full py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img src="/logo.svg" alt="logo" className="h-10 w-10" />
            <p className="text-lg font-semibold">{APP_NAME}</p>
          </div>
          {isAuthenticated && (
            <div className="flex gap-4 items-center">
              {user?.name && <span>Welcome, {user?.name.split(' ')[0]}!</span>}
              <Button onClick={signOut} className="cursor-pointer">
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center w-full px-6 py-10">
        <div className="max-w-4xl w-full">
          <Outlet />
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
