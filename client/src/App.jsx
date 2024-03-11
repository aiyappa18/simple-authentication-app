import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import DashBoard from './components/DashBoard'
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
