import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Finder from './pages/Finder';
import Dashboard from './pages/Dashboard';
import Protect from './utils/Protect';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/finder" element={<Finder />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route element ={<Protect/>} >
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
