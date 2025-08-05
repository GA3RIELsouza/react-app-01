import { useEffect, useState } from "react"
import axios from "axios"

export default function UserList({ onUserDeleted, reload }) {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:3000/users")
            setUsers(res.data)
        } catch (err) {
            alert(err)
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`http://127.0.0.1:3000/users/${id}`)
            onUserDeleted()
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [reload])

    return (
        <div>
            <h2>Lista de Usuários:</h2>
            {users.length == 0
                ? <p>Sem usuários cadastrados.</p>
                : <ul>
                    {users.map(user => (
                        <li key={user.id}><button onClick={()=>{deleteUser(user.id)}}>X</button> {user.name}</li>
                    ))}
                </ul>}
        </div>
    )
}
