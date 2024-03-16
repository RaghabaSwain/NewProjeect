import React from 'react'
import "./global.css"
import { Route, Routes } from 'react-router-dom'
import AuthLayOut from './_auth/AuthLayOut'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import Home from './_root/pages/Home'
import RootLayOut from './_root/RootLayOut'
import Explore from './_root/pages/Explore'
import CreatePost from './_root/pages/CreatePost'
import Saved from './_root/pages/Saved'
import AllUsers from './_root/pages/AllUsers'
import EditPost from './_root/pages/EditPost'

const App = () => {
  return (
    <main className="flex h-screen">
       <Routes>
        <Route element={<AuthLayOut/>}>
            <Route path='/sign-in' element={<SignInForm/>}/>
            <Route path='/sign-up' element={<SignUpForm/>}/>

        </Route>

        <Route element={<RootLayOut/>}>
            <Route index element={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/edit-post/:id' element={<EditPost/>}/>

        </Route>
       </Routes>
    </main>
  )
}

export default App