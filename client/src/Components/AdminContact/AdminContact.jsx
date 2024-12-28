import React, { useEffect, useState } from 'react'
import { viewContact } from '../../network/user.api';

export default function AdminContact() {
    const [contacts, setcontacts] = useState([])


    async function showContact(){
        const result = await viewContact()
        .then((res) => {
            console.log(res);
            //set ==> res.data.contacts ==> map ==> display
            setcontacts(res.data.contacts)
        })
        .catch((res) => {
            console.log(res);
        });
    }   

    const uniqueContacts = contacts.filter(
        (contact, index, self) =>
            index === self.findIndex((c) => c.name === contact.name)
    );

    useEffect(() => {
        showContact()
        }, []);


return (

    
    <>
    <div className="col-10 mt-3">
        <div className="row">

                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                        <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Message</th>
                        </tr>
                        </thead>

                        {contacts.map((contact) => {
                            return(
                                <tbody>
                                <tr>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.subject}</td>
                                    <td>{contact.message} <input className='test' type="checkbox"/></td>
                                </tr>
                                </tbody>
                            )
                        })}



                        
                    </table>
                        </div>
                    </div>
                </div> 


        </div>
    </div>
    </>
)

}
