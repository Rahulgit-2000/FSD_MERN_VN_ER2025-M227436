import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Check, X, Edit, Plus } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // ... (fetch logic same) ...
    }, [user]);

    const deleteHandler = async (id) => {
        // ... (delete logic same) ...
    };

    const createUserHandler = () => {
        navigate('/admin/user/new');
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="container">
            <div className="section-header">
                <h1 className="page-title">Users</h1>
                <button className="btn btn-primary" onClick={createUserHandler}>
                    <Plus size={20} /> Create User
                </button>
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (
                                        <Check color="green" size={20} />
                                    ) : (
                                        <X color="red" size={20} />
                                    )}
                                </td>
                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`} className="btn-icon">
                                        <Edit size={20} />
                                    </Link>
                                    <button
                                        className="btn-icon delete-btn"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
