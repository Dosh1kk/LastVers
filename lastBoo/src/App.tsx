import { useState } from 'react'
import './App.css'
import { UserProvider } from './assets/Context/UserAuth'
import Navbaar from './Components/Navbaar/Navbaar'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  return (
    <>
      <UserProvider>
        <Navbaar />
        <Outlet />
        {/* <ToastContainer /> */}
      </UserProvider>
      

    </>
  )
}

export default App
