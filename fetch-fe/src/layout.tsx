import { Outlet, Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const auth = useAuth()

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[1280px] mx-auto">
      {/* Header */}
      <header className="w-full py-2">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <img src="/logo.svg" alt="logo" className="h-10 w-10" />
          {auth?.isAuthenticated && (
            <Button onClick={auth?.signOut}>Sign Out</Button>
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
      <footer className="w-full shadow-md py-4">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>
            Made with ❤️ |{' '}
            <Link
              to="https://github.com/kaayce/fetch-FE"
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
