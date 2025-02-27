import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { AuthProvider } from './context/auth-provider'
import Layout from './layout'
import Search from './pages/search'
import Login from './pages/login'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <AuthProvider>
              <Layout />
            </AuthProvider>
          }
        >
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
