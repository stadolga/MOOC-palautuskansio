import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const UserTable = ({users}) => {
    return(
        <div className="secondaryElems">
            <h1>Users</h1>
            <Table striped>
                <tbody>
                    <tr>
                        <th></th>
                        <th><b>blogs created</b></th>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
    
    

export default UserTable