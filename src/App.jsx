import { useState } from "react"
import UserList from "./components/UserList"
import UserForm from "./components/UserForm"

export default function App() {
    const [reload, setReload] = useState(false)

    const handleReload = () => {
      setReload(prev => !prev)
    }
    
    return (
      <div>
        <h1>GERENCIAMENTO DE USUÁRIOS - UniSENAI</h1>
        <UserForm onUserCreated={handleReload} />
        <UserList onUserDeleted={handleReload} reload={reload} />
      </div>
    )
}
