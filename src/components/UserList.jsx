import { useEffect, useState } from "react"
import axios from "axios"

export default function UserList({ onUserDeleted, reload }) {
    const [users, setUsers] = useState([])
    const [userId, setEditing] = useState(0)
    const [x, cancelEditing] = useState(0)

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
            await axios.delete(`http://127.0.0.1:3000/users/${id}`)
            onUserDeleted()
        } catch (err) {
            alert(err)
        }
    }

    const updateUser = async (id, name) => {
        try {
            const payload = {name}
            await axios.put(`http://127.0.0.1:3000/users/${id}`, payload)
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
            {users.length === 0
                ? <p>Sem usuários cadastrados.</p>
                : <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {`${user.name} `}
                            <button onClick={()=>{updateUser(user.id, "Editado!")}}>Editar</button>
                            <button onClick={()=>{deleteUser(user.id)}}>X</button>
                        </li>
                    ))}
                </ul>}
        </div>
    )
}
