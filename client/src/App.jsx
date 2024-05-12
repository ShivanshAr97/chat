import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage'
import About from './components/About'
import Login from './components/Login'
import Navbar from './Navbar';
import Register from './components/Register';
import ChatPage from './components/ChatPage';

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/chats' element={<ChatPage/>} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
