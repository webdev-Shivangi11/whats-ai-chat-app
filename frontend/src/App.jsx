import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/userContext'
import bg from "./assets/chatbg.mp4"
function App() {
  return (
<>
 {/* <div className="h-screen  z-0 ">
    <video autoPlay muted loop playsInline>
      <source src={bg} type="video/mp4" />
     <UserProvider>
  <AppRoutes/>
</UserProvider>
    </video>
  </div> */}

<UserProvider>
  <AppRoutes/>
</UserProvider>

</>
  )
}

export default App