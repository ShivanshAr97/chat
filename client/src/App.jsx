import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage'
import About from './components/About'
import Login from './components/Login'
import Navbar from './Navbar';

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <p className="bg-green-500">Lorem ipsum dolor sit amet.</p>
    </>
  )
}

export default App
