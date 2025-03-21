import React from 'react'
import AdmineNavbar from './AdmineNavbar'
import { Outlet } from 'react-router-dom'

const AdmineLayout = () => {
    return <>
        <AdmineNavbar />
        <Outlet />
    </>
}

export default AdmineLayout