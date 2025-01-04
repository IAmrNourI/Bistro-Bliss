import React, { useEffect, useState } from "react";
import { searchContact, viewContact } from "../../network/user.api";

export default function AdminContact() {
const [contacts, setcontacts] = useState([]);

async function showContact() {
const result = await viewContact()
    .then((res) => {
    console.log(res);
    //set ==> res.data.contacts ==> map ==> display
    setcontacts(res.data.contacts);
    })
    .catch((res) => {
    console.log(res);
    });
}

// const uniqueContacts = contacts.filter(
// (contact, index, self) =>
//     index === self.findIndex((c) => c.name === contact.name)
// );

useEffect(() => {
showContact();
}, []);

async function handleSearch(e){
    const value = e.target.value
    try {
        const result = await searchContact({ search: value })
        console.log(result);
        setcontacts(result.data.data)
    } catch (error) {
        console.error(error);
    }
}

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
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Message</th>
                </tr>
                </thead>

                {contacts && contacts.length > 0 ? (
                contacts?.map((contact) => (
                <tbody key={contact.id}>
                    <tr>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.subject}</td>
                        <td>
                            {contact.message}{" "}
                            <input className="test" type="checkbox" />
                        </td>
                    </tr>
                </tbody>
                ))
                ) : (
                <tbody>
                <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                        No contacts found.
                    </td>
                </tr>
                </tbody>
                )}



            </table>
            </div>
        </div>
        </div>
    </div>
    </div>
</>
);
}
