import { useContext } from 'react'  
import { UserContext } from '../context/userContext'

function Home() {
    const { user } = useContext(UserContext)

  return (
  <div className=" min-h-screen flex items-center justify-center bg-conic from-blue-500 via-purple-500 to-pink-500">
  {JSON.stringify(user)}
</div>  
  )

}

export default Home