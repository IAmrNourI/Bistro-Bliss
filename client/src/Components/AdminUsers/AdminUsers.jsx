import React, { useEffect, useState } from 'react'
import { appointAsAdmin, getAllUsers, searchUser } from '../../network/user.api';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminUsers() {
    const [users, setusers] = useState([])

    async function getUsers() {
        const result = await getAllUsers()
        .then((res) => {
            console.log(res)
            setusers(res.data.data)
        })
        .catch((res) => {
            toast.error(res.response.data.message)
        });
    }

    async function makeAdmin(id) {
        try {
            const result = await appointAsAdmin(id)
            console.log(result)
            toast.success(result.data.message)
            getUsers()
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    
    async function handleSearch(e){
        const value = e.target.value
        try {
            const result = await searchUser({ email: value })
            console.log(result);
            setusers([result.data.data])
        } catch {
            getUsers()
        }
    }

useEffect(() => {
    getUsers()
    }, []);

return (
    <>
        <div className="col-10 mt-3">

        <div className="form-floating mb-3">
            <input
                onChange={handleSearch}
                name="phoneNumber"
                type="serch"
                className="form-control"
                placeholder=""
            />
        <label htmlFor="floatingInput">Search (email, name, subject)</label>

    </div>
        <div className="row">
            <div className="col-12">
            <div className="row">
                <div className="col-12">
                <table className="table table-bordered pb-5 ">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">PhoneNumber</th>
                        <th scope="col">Role</th>
                        <th scope="col">Appoint As Admin</th>
                    </tr>
                    </thead>
                    {users?.map((user) => {
                    return (
                        <tbody className="table-row">
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.role}</td>
                            <td>
                            <button
                                onClick={() => makeAdmin(user._id)}
                                className="btn btn-outline-success me-2"
                            >
                                Appoint As admin
                            </button>
                            </td>
                        </tr>
                        </tbody>
                    );
                    })}
                </table>
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    );
}
