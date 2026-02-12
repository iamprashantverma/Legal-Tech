import { Routes, Route} from 'react-router-dom'
import Login from '../pages/auth/Login'
import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import About from '../component/common/About';
const PublicRoutes = () => {
  return (
    <Routes>
        <Route path='/'      element = {<Home/>} />
        <Route path='/login' element = { <Login/> } />
        <Route path='/signup'element = { <Signup/> } />
        <Route path='/about' element = { <About/>} />
    </Routes>
  )
}

export default PublicRoutes
