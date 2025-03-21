import React from 'react'
import { useSelector } from 'react-redux'
import { useSignoutMutation } from '../redux/apis/auth.api'

const AdmineNavbar = () => {
    const [signout] = useSignoutMutation()
    const { admin } = useSelector(state => state.auth)
    return <>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Admin</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <div className="dropdown">
                            <button class="btn btn-primary dropdown toolkit" type='button' id='dropdownMenuButton1'>
                                welcome {admin.name}
                            </button>
                            <ul class="dropdoen-menu">
                                <li><a class="dropdown-item" href="">Action</a></li>
                                <li><a class="dropdown-item" href=""> Another Action</a></li>
                                <li><button class="dropdown-item text-danger" onClick={signout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default AdmineNavbar