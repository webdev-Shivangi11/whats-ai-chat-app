import React, { useContext, useState, useEffect, useRef } from 'react'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Navbar from "./Navbar"
import bgvideo from "../assets/Chatbg.mp4"
import { gsap } from 'gsap';

const Home = () => {

    const { user } = useContext(UserContext)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ projectName, setProjectName ] = useState(null)
    const [ project, setProject ] = useState([])

    const navigate = useNavigate()
    
const headingRef = useRef(null);

useEffect(() => {
  gsap.from(headingRef.current, {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: 'power3.out',
  });
}, []);

    function createProject(e) {
        e.preventDefault()
        console.log({ projectName })

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
                // navigate("/project")
                navigate("/project", {
            state: { project }  // <-- backend should return created project
          });
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get('/projects/all').then((res) => {
            // console.log(res.data)
            setProject(res.data.projects)

        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (<>
        <main className='flex h-max-auto bg-black  ' >
            {/* <div className='flex gap-10  bg-gray-800 '> */}
          <div className="relative  w-full  z-10 min-h-screen flex flex-col justify-center items-center text bg-black">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover bg-black bg-opacity-40 -z-10"
    autoPlay
    muted
    loop
  >
    <source src={bgvideo} type="video/mp4" />
  </video>
{/* </div>   */}

      <div className="projects h-auto flex flex-wrap gap-2  bg-transparent backdrop-brightness-100 p-10 xl:p-30 z-40">
        <Navbar/>
                <div className='flex gap-2 flex-col'>

                    <h1 className='text-6xl xl:text-9xl font-extrabold text-transparent xl:pr-50 bg-clip-text bg-gradient-to-bl from-[#e879f9] via-[#4ade80] to-[#be123c] p-5'> 
                        Build Meaningful Connection and elevate  your Career</h1>
                    {/* <p className='text-gray-300 text-lg p-6 xl:text-2xl'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae amet officiis maiores quia odit accusantium, modi eius repudiandae natus, architecto at neque, magni velit suscipit laboriosam labore atque cumque alias.</p> */}
                        </div>                
                  <div className='flex flex-col gap-10'>
                    <div>
                         <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border lg:text-xl mt-3   bg-green-950 cursor-pointer text-center font-mono text-gray-50 border-slate-300 rounded-md  z-20">
                    New Project
                    <i className="ri-link ml-2 text-white"></i>
                     </button>
                    </div>
                    <div className=' flex flex-col gap-5  '>
                     <div className="text-4xl flex w-full justify-center items-center font-mono text-green-400 py-3 hover:underline text-center">My Projects</div>
                   <div className=' grid grid-cols-1  gap-4 xl:grid-cols-4  xl:p-6 xl:gap-8 '>
                                 {
                    project.map((project) => (
                        <div key={project._id}
                            onClick={() => {
                                navigate(`/project`, {
                                    state: { project }
                                })
                            }}
                            className="project flex-col xl:p-6 gap-2 cursor-pointer p-2 border bg-[#303030] border-slate-300 rounded-md min-w-auto hover:opacity-70 ">
                            <h2
                                className='font-semibold text-white'
                            >{project.name}</h2>

                            <div className="flex gap-2 text-gray-500 text-lg">
                                <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                                {project.users.length}
                            </div>

                        </div>
                    ))
                }
                   </div>
                   </div>   
                   </div>   



            </div>
            {/* <div className=' p-20' ><img src={sideimg} alt="" /></div> */}
            </div>
      

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-300 p-6  rounded-md shadow-md w-1/2 xl:w-1/3">
                        <h2 className="text-2xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block  text-xl  font-mono text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" className="mt-1 block w-full p-2 border border-gray-600 rounded-md" required />

                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#37a35f] text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </main>
        </>
    )
}

export default Home