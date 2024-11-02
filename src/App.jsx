import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './Shared/pages/Landing'
import NavBar from './Shared/Components/NavBar'
import Footer from './Shared/Components/Footer'
import SignUp from './Customer/Pages/SignUp'
import Login from './Shared/pages/Login'
import TechnicianList from './Customer/Pages/TechnicianList'
import ContactUs from './Customer/Pages/ContactUs'
import Registration from './Technician/Pages/Registration'
import TechnicianDetail from './Customer/Pages/TechnicianDetail'
import BookTechnician from './Customer/Pages/BookTechnician'
import VerificationPage from './Customer/Pages/VerificationPage'
import TechVerificationPage from './Technician/Pages/TechVerificationPage'

import Services from './Customer/Pages/Services'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/customer-signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/services' element={<Services />} />
          <Route path='/all-technician-list' element={<TechnicianList/>} />
          <Route path='/technician-list' element={<TechnicianList/>} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/technician-registration' element={<Registration />} />
          <Route path ='/technician-details/:id' element={<TechnicianDetail />} />
          <Route path ='/book-technician/:id' element={<BookTechnician />} />
          <Route path="/verify-email"  element={<VerificationPage />} />
          <Route path='/tech-verification-waiting' element={<TechVerificationPage />} />
        </Routes>
      </Router>
    
   
    </>
  )
}

export default App
