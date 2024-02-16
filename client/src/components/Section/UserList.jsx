import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';

const UserList = () => {
    const [users, setUsers] = useState([]);
      const token = localStorage.getItem("token");

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/all/users", {
        // const res = await fetch('https://solarmed.onrender.com/admin/', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // add the token to the Authorization header
        },
        credentials: "include",
      });
      const users = await res.json();
      setUsers(users);
      console.log(users);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

      const handleDelete = async (id) => {
    console.log("delete " + id);
    try {
      const res = await fetch(`http://localhost:8080/admin/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const msg = await res.json();
      alert(msg.message);
    } catch (error) {
      console.log(error);
    } finally {
      getUsers();
    }
    };

    useEffect(() => {
        getUsers();
    },[]);
    return (
          <table className="table-auto border-collapse border border-blue-800">
            <thead className="text-zinc-800">
              <tr>
                <th className="border border-blue-300 px-4 py-2 max-w-xs "></th>
                {/* <th className="border border-blue-300 px-4 py-2 max-w-xs "></th> */}
                <th className="border border-blue-300 px-4 py-2 max-w-xs ">
                  S no.
                </th>
                <th className="border border-blue-300 px-4 py-2">Name</th>
                <th className="border border-blue-300 px-4 py-2">Email</th>
                <th className="border border-blue-300 px-4 py-2">Phone</th>
                <th className="border border-blue-300 px-4 py-2">Work</th>
              </tr>
            </thead>
            {users.map((user, index) => {
              return (
                <tbody key={index}>
                  <tr className="text-zinc-600">
                    <td
                      className="border border-blue-300 px-4 py-2 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDelete />
                    </td>
                    {/* <td
                      className="border border-blue-300 px-4 py-2 text-blue-500"
                      onClick={() => handleEditClick(user._id)}
                    >
                      <FaEdit />
                      {editingId === user._id && (
                        <select onChange={(e) => handleRoleChange(e, user._id)}>
                          <option value="">Roles</option>
                          <option value="user">User</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td> */}
                    <td className="border border-blue-300 px-4 py-2 max-w-xs overflow-auto">
                      {index + 1}
                    </td>
                    <td className="border border-blue-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-blue-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-blue-300 px-4 py-2">
                      {user.phone}
                    </td>
                    <td className="border border-blue-300 px-4 py-2">
                      {user.work}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
  )
}

export default UserList
