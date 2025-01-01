import React, { useEffect, useState } from 'react'
import { appointAsAdmin, getAllUsers } from '../../network/user.api';

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

    async function makeAdmin(id){
        console.log(id);
        const result = await appointAsAdmin(id)
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            // toast.error(res.response.data.message)
        });
    }


useEffect(() => {
    getUsers()
    }, []);

return (
    <>
        <div className="col-10 mt-3">
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
                    {users.map((user) => {
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
