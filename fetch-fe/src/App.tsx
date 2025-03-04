import { Route, BrowserRouter as Router, Routes } from 'react-router'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from './context/auth-provider'
import Layout from './layout'
import Search from './pages/search'
import Login from './pages/login'
import { toast } from 'sonner'
import { FavoritesProvider } from './context/favorites-provider'
import Match from './pages/match'
import { DAY, PATHS } from './lib/constants'
import { Suspense } from 'react'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`API Error: ${error.message}`),
  }),
  defaultOptions: {
    queries: {
      staleTime: DAY,
      placeholderData: (prev: unknown) => prev,
    },
  },
})

const Fallback = () => <div className="text-center">Loading...</div>

function App() {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route
            element={
              <QueryClientProvider client={queryClient}>
                <AuthProvider>
                  <FavoritesProvider>
                    <Layout />
                  </FavoritesProvider>
                </AuthProvider>
              </QueryClientProvider>
            }
          >
            <Route path={PATHS.HOME} element={<Search />} />
            <Route path={PATHS.MATCH} element={<Match />} />
            <Route path={PATHS.LOGIN} element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
