import Home from "./components/Home"
import { Route, Routes } from "react-router-dom"
import About from "./components/About"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Contact from "./components/Contact"
import Header from "./components/Header"
import Services from "./components/Services"
import Doctors from "./components/Doctors"
import Appointment from "./components/Appointment"
import { AuthProvider } from "./contexts/AuthContext";
import Admin from "./components/Section/Admin"
import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
const locomotiveScroll = new LocomotiveScroll();
  return (
    <AuthProvider>
      <div className="bg-zinc-200 font-['Helvetica_Now_Display'] ">
        <Header />
        <Routes>
            <Route path="/" element={ <Home/> } />
          <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Services/>} />
            <Route path="/doctors" element={<Doctors/>} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/admin" element={<Admin />} />

          </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
