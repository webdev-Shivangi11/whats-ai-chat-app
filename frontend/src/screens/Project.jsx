import React, { useEffect } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
 import { useState } from 'react' 
 import axios from '../config/axios'
 import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import { UserContext } from '../context/userContext'
import { useContext } from 'react'
import Markdown from 'markdown-to-jsx'
// import hljs from 'highlight.js';
import { useRef } from 'react'


function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

    React.useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            ref.current.removeAttribute('data-highlighted')
        }
    }, [ props.className, props.children ])

    return <code {...props} ref={ref} />
}


function Project() {
  const location=useLocation()
//   console.log(location.state)
   const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)
     const [ isModalOpen, setIsModalOpen ] = useState(false)
const [ selectedUserId, setSelectedUserId ] = useState([]) 
const [project, setProject] = useState(location.state.project)

const [users, setUsers] = useState([])
const {user}=useContext(UserContext)
const [message, setMessage] = useState("")
const [messages, setMessages] = useState([])
    const navigate = useNavigate()
const messageBox=React.createRef()

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


 function addCollaborators() {
        axios.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            console.log(res.data)
            setIsModalOpen(false)
        }).catch(err => {
            console.log(err)
        })
    }

function send(){
    sendMessage("project-message",{
    message,
    sender:user
})
setMessages(prevMessages => [ ...prevMessages, { sender: user, message } ]) // Update messages state
    
setMessage("")

}
function WriteAiMessage(message) {

        const messageObject = JSON.parse(message)

        return (
            <div
                className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
            >
                <Markdown
                    children={messageObject.text}
                    options={{
                        overrides: {
                            code: SyntaxHighlightedCode,
                        },
                    }}
                />
            </div>)
    }
useEffect(()=>{
initializeSocket(project._id)
receiveMessage("project-message",data=>{
    console.log(data)
    setMessages(prevMessages=>[...prevMessages,data])
})
 axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {

    //  console.log(location.state.project._id)
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


function scrollToBottom(){
     messageBox.current.scrollTop = messageBox.current.scrollHeight
}
  return (
 <main className='h-screen w-screen flex'>
            <section className="left relative flex flex-col h-screen min-w-100 bg-black">
                <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-1 top-0'>
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

                    <div
                      ref={messageBox}
                    // className="message-box p-1 flex-grow flex flex-col gap-3 overflow-auto max-h-full scrollbar-hide mt-4">
                      className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                                <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                                <div className='text-sm'>
                                    {msg.sender._id === 'ai' ?
                                    WriteAiMessage(msg.message)
                                    : <p>{msg.message}</p>
                                    }
                                    {/* //  <div className="overflow-auto bg-gray-900 text-gray-300"> */}
                                        {/* <Markdown>{msg.message}</Markdown> */}
                                        
                                    {/* // </div> */}

                                </div>
                            </div>
                        ))}
                        
                    </div>

                    <div className="inputField w-full flex absolute bottom-0">
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            className='p-2 px-4 border-none outline flex-grow text-gray-400' type="text" placeholder='Enter message' />
                        <button
                            onClick={send}
                            className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill text-white"></i></button>
                    </div>
                </div>
              {/* sidepanel   */}
<div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-800 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
   <header className='flex justify-between items-center px-4 p-2 bg-slate-500 '>
                       <h1 className='font-semibold text-lg'>Collaborators</h1>
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
                                    <h1  className='font-semibold text-lg  text-gray-300'>{user.email}</h1>
                                    
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