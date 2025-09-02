import React, { useEffect } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
 import { useState } from 'react' 
 import axios from '../config/axios'


function Project() {
  const location=useLocation()
  console.log(location.state)
   const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)
     const [ isModalOpen, setIsModalOpen ] = useState(false)
const [ selectedUserId, setSelectedUserId ] = useState([]) 
const [project, setProject] = useState(location.state.project)

const [users, setUsers] = useState([])
const handleUserClick=(id)=>{
  // setSelectedUserId([...selectedUserId,id])
   setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }

            return newSelectedUserId;
        });
}


useEffect(()=>{

 axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {

            console.log(res.data.project)

            setProject(res.data.project)
            // setFileTree(res.data.project.fileTree || {})
        })

axios.get('/users/all').then(res=>{
  setUsers(res.data.users)
}).catch(err=>{
  console.log(err)
})

},[])

 function addCollaborators() {
        axios.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            // console.log(res.data)
            setIsModalOpen(false)
        }).catch(err => {
            console.log(err)
        })
    }

  return (
 <main className='h-screen w-screen flex'>
            <section className="left relative flex flex-col h-screen min-w-96 bg-black">
                <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0'>
                    <button className='flex gap-2' onClick={()=>{setIsModalOpen(true)}} >
                        <i className="ri-user-add-fill mr-1"></i>
                        <p>Add collaborator</p>
                    </button>
                    <button  className='p-2'  
                      onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">

                    <div className="message-box p-1 flex-grow flex flex-col gap-2 overflow-auto max-h-full scrollbar-hide">
                      
                            <div   className= "message flex flex-col p-2 bg-gray-800 max-w-96 rounded-md">
                                <small className='opacity-65 text-xs text-gray-300'>exampllbvcvjhbvh</small>
                                <div className='text-m text-white '>
                      
                                       <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, beatae?</p>
                                </div>
                                 </div>
                                <div className="incoming message ml-auto flex flex-col p-2 bg-gray-800 w-fit rounded-md">
                                   <small className='opacity-65 text-xs text-gray-300 '>exampllbvcvjhbvh</small>
                                <div className='text-m text-white'>
                      
                                       <p>Lorem ipsum  adipisicing elit. Quia, beatae?</p>
                                </div>
                                </div>
                           
                        
                    </div>

                    <div className="inputField w-full flex absolute bottom-0">
                        <input
                            // value={message}
                            // onChange={(e) => setMessage(e.target.value)}
                            className='p-2 px-4 border-none outline flex-grow text-gray-400' type="text" placeholder='Enter message' />
                        <button
                            // onClick={send}
                            className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill text-white"></i></button>
                    </div>
                </div>
              {/* sidepanel   */}
<div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-800 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
   <header className='flex justify-between items-center px-4 p-2 bg-slate-500'>
                       
               <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                            <i className="ri-close-fill "></i>
                        </button>
                    </header>
                     <div className="users flex flex-col gap-2">

                        {project.users && project.users.map(user => {


                             return ( 
                                <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                                    <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                    {/* <h1 className='font-semibold text-lg text-gray-300'>emailabhgvj</h1> */}
                                    
                                </div>
                             ) 


                       })} 
                    </div>
</div>

            </section>

          {/* //adding modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-200 p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2 '>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user._id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-green-300' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                {/* <div key={user.id} className={`user cursor-pointer hover:bg-slate-100  p-2 flex gap-2 items-center`}  */}
                                {/* onClick={() => handleUserClick(user._id)}> */}
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5  bg-slate-300'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}

        </main>
  )
}

export default Project