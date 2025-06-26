import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/routes'
import { AuthProvider } from './context/AuthContext';
import { ScoreProvider } from './context/ScoreContext';

function App() {
  return (
    <ScoreProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
    </ScoreProvider>
  )
}
export default App;