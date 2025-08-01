import { useEffect, useState } from "react"
import axios from "axios"

function UserList() {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const res = await axios.get('http://127.0.0.1:3000/users')
        setUsers(res.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return(
        <div>
            <h3>Lista de usuários:</h3>
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => {
                            {return(
                                <tr key={index + 1}>
                                    <td>
                                        {user.id}
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                </tr> 
                            )}
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Sem usuários cadastros</p>
            )}
        </div>
    )
}

export default UserList
