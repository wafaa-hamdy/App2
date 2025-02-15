import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
    return (<>
        <Navbar/>
        <div className="container pb-16 pt-24  min-h-[70vh]">
            <Outlet/>
        </div>
        <Footer/>
    
    </>
    )
}
