import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const token = localStorage.getItem("token");
    
      const getDoctors = async () => {
    try {
      // const res = await fetch("http://localhost:8080/admin/all/doctors", {
      const res = await fetch("https://solarmed.onrender.com/admin/all/doctors", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // add the token to the Authorization header
        },
        credentials: "include",
      });
      const data = await res.json();
      setDoctors(data);
      console.log(data);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [addDoctor, setAddDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setAddDoctor({ ...addDoctor, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const addDoctors = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const response = await fetch("http://localhost:8080/doctors/register", {
      const response = await fetch("https://solarmed.onrender.com/doctors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...addDoctor
        }),
        credentials:"include",
      });
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      const data = await response.json();
      alert("Doctor added successfully");
      // navigate("/admin");
    } catch (error) {
      console.log(error);
      alert("Invalid details");
    } finally {
      setModalOpen(false);
      setLoading(false);
      getDoctors();
    }
    };

     const handleDelete = async (id) => {
    console.log("delete " + id);
    try {
      // const res = await fetch(`http://localhost:8080/doctors/delete/${id}`, {
      const res = await fetch(`tps://solarmed.onrender.com/doctors/delete/${id}`, {
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
      getDoctors();
    }
  };
    useEffect(() => {
        getDoctors();
    }, []);
  return (
          <>
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
                  <th className="border border-blue-300 px-4 py-2">
                    Specialization
                  </th>
                </tr>
              </thead>
              {doctors.map((doctor, index) => {
                return (
                  <tbody key={index}>
                    <tr className="text-zinc-600">
                      <td
                        className="border border-blue-300 px-4 py-2 text-red-500 "
                        onClick={() => handleDelete(doctor._id)}
                      >
                        <MdDelete />
                      </td>
                      {/* <td
                      className="border border-blue-300 px-4 py-2 text-blue-500"
                      onClick={() => handleEditClick(doctor._id)}
                    >
                      <FaEdit />
                      {editingId === doctor._id && (
                        <select onChange={(e) => handleRoleChange(e, doctor._id)}>
                          <option value="">Roles</option>
                          <option value="doctor">doctor</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td> */}
                      <td className="border border-blue-300 px-4 py-2 max-w-xs overflow-auto">
                        {index + 1}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        {doctor.name}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        {doctor.email}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        {doctor.phone}
                      </td>
                      <td className="border border-blue-300 px-4 py-2">
                        {doctor.specialization}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
           <div className="add mt-5">
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-x-2 px-4 py-2 border-2 border-zinc-400 rounded-full"
      >
        Add Doctor
        <FaPlus />
      </button>

      {modalOpen && (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>
            <form method="POST" onSubmit={addDoctors}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={addDoctor.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
                  required
                />
                      </div>
                       <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={addDoctor.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
                  required
                />
              </div>
                <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={addDoctor.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specialization" className="block text-gray-700 font-medium">Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={addDoctor.specialization}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4598af] text-white py-2 px-4 rounded-md hover:bg-[#1c748a] focus:outline-none focus:bg-[#1c748a]"
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
          </>
  )
}

export default DoctorList