import React, { useContext, useState, useEffect } from 'react'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Navbar from "./Navbar"
const Home = () => {

    const { user } = useContext(UserContext)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ projectName, setProjectName ] = useState(null)
    const [ project, setProject ] = useState([])

    const navigate = useNavigate()

    function createProject(e) {
        e.preventDefault()
        console.log({ projectName })

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get('/projects/all').then((res) => {
            console.log(res.data)
            setProject(res.data.projects)

        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (<>
        {/* <Navbar/> */}
        <main className='p-4'>
            <div className="projects h-screen flex flex-wrap gap-2  bg-gray-800 p-40">
                <div className='flex gap-2 flex-col'>
                    {/* <h1 className='text-8xl text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'> Build Meaningful Connection and elevate  your Career</h1> */}
                    <h1 className='text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-4'> Build Meaningful Connection and elevate  your Career</h1>
                    <p className='text-gray-300 text-2xl p-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae amet officiis maiores quia odit accusantium, modi eius repudiandae natus, architecto at neque, magni velit suscipit laboriosam labore atque cumque alias.</p>
                        </div>                
                  <div>
                     <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border text-xl font-mono text-gray-50 border-slate-300 rounded-md ">
                    New Project
                    <i className="ri-link ml-2 text-white"></i>
                     </button>
                                {
                    project.map((project) => (
                        <div key={project._id}
                            onClick={() => {
                                navigate(`/project`, {
                                    state: { project }
                                })
                            }}
                            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
                            <h2
                                className='font-semibold'
                            >{project.name}</h2>

                            <div className="flex gap-2">
                                <p> <small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                                {project.users.length}
                            </div>

                        </div>
                    ))
                }
                   </div>      



            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-gray-300 p-6 rounded-md shadow-md w-1/3">
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
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
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