import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Finder from './pages/Finder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/finder" element={<Finder />} />
      </Routes>
    </Router>
  )
}

export default App
