import { useState } from "react"
import axios from "axios"

export default function UserForm({ onUserCreated }) {
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("É necessário informar o nome!")
            return
        }

        try {
            await axios.post("http://127.0.0.1:3000/users", {name})
        } catch (err) {
            alert(err)
        }

        setName("")
        onUserCreated()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Digite o nome do usuário:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="submit" />
            </form>
            
        </div>
    )
}
