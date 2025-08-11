import { useEffect, useState } from "react"
import axios from "axios"

export default function UserList({ onUserDeleted, reload }) {
    const [users, setUsers] = useState([])
    const [editingUserId, setEditingUserId] = useState(null)
    const [editingName, setEditingName] = useState("")

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
            const payload = { name }
            await axios.put(`http://127.0.0.1:3000/users/${id}`, payload)
            setEditingUserId(null)
            onUserDeleted()
        } catch (err) {
            alert(err)
        }
    }

    const startEditing = (user) => {
        setEditingUserId(user.id)
        setEditingName(user.name)
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
                            {editingUserId === user.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                    />
                                    <button onClick={() => updateUser(user.id, editingName)}>Salvar</button>
                                    <button onClick={() => setEditingUserId(null)}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    {`${user.name} `}
                                    <button onClick={() => startEditing(user)}>Editar</button>
                                    <button onClick={() => deleteUser(user.id)}>X</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>}
        </div>
    )
}
