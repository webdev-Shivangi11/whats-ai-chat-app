import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'

import Project from '../screens/Project'
import AllProjects from '../screens/AllProjects'
function AppRoutes() {
  return (
 <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/project" element={<Project />} />
                <Route path="/all-project" element={<AllProjects/>} />
            </Routes>

        </BrowserRouter>  )
}

export default AppRoutes