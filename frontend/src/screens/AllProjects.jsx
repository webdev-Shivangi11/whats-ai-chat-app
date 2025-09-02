
import { useLocation } from 'react-router-dom'

const AllProjects = () => {
  const { state } = useLocation()
  const project = state?.project

  if (!project) {
    return <p>No project data found.</p>
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>Collaborators: {project.users?.length || 0}</p>
    </div>
  )
}

// import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Navbar from './Navbar'

// const AllProjects = () => {
//   const { state } = useLocation()
//   const navigate = useNavigate()

//   const project = state?.project

//   if (!project) {
//     return (
//       <div className="p-10 text-center text-red-500">
//         <h2>⚠️ No project data found.</h2>
//         <button
//           onClick={() => navigate('/')}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Go Back Home
//         </button>
//       </div>
//     )
//   }

//   return (
//     <>
//       {/* <Navbar /> */}
//       <main className="p-10 bg-gray-100 min-h-screen">
//         <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//           <h1 className="text-4xl font-bold text-purple-600 mb-4">{project.name}</h1>

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-700">Collaborators</h2>
//             <p className="text-gray-600">{project.users.length} member(s)</p>
//           </div>

//           {/* Optional: Add more project details here */}
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold text-gray-700">Project ID</h2>
//             <p className="text-gray-600">{project._id}</p>
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={() => navigate('/')}
//               className="px-4 py-2 bg-gray-800 text-white rounded-md"
//             >
//               ← Back to Projects
//             </button>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

export default AllProjects