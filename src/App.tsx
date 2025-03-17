import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/auth-provider'
import Layout from './layout'
import Search from './pages/search'
import Login from './pages/login'
import { FavoritesProvider } from './context/favorites-provider'
import Match from './pages/match'
import { PATHS } from './lib/constants'
import { Suspense } from 'react'
import { createQueryClient } from './lib/queryClient'

const Fallback = () => <div className="text-center">Loading...</div>

const queryClient = createQueryClient()

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
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.HOME} element={<Search />} />
            <Route path={PATHS.MATCH} element={<Match />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
