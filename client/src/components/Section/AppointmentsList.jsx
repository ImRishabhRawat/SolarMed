import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const AppointmentsList = () => {
    const token = localStorage.getItem("token");
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);

    const getAppointments = async () => {
    try {
      const res = await fetch("http://localhost:8080/doc/appointments/all", {
        // const res = await fetch('https://solarmed.onrender.com/admin/', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // add the token to the Authorization header
        },
        credentials: "include",
      });
      const data = await res.json();
      setAppointments(data);
      console.log(data);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
    };

    const getDoctors = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/all/doctors", {
        // const res = await fetch('https://solarmed.onrender.com/admin/', {
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

    const handleEditClick = (appointmentId) => {
    setEditingAppointmentId(appointmentId);
    };

    const handleDoctorSelect = async (doctorName) => {
    try {
      const response = await fetch(`http://localhost:8080/doc/appointments/edit/${editingAppointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: doctorName,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }
      alert("Doctor updated successfully");
      setEditingAppointmentId(null); // Close the modal
    } catch (error) {
      console.error(error);
    } finally {
      // Fetch appointments again to get the updated data
    }
  };

    const handleDelete = async (id) => {
    console.log("delete " + id);
    try {
      const res = await fetch(`http://localhost:8080/doc/appointments/delete/${id}`, {
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
      getAppointments();
    }
    };

    useEffect(() => {
      getAppointments();
      getDoctors();
    },[]);

  return (
          <table className="table-auto border-collapse border border-blue-800">
            <thead className="text-zinc-800">
              <tr>
                <th className="border border-blue-300 px-4 py-2  max-w-xs "></th>
                <th className="border border-blue-300 px-4 py-2  max-w-xs ">
                  Patient Name
                </th>
                <th className="border border-blue-300 px-4 py-2 ">Doctor</th>
                <th className="border border-blue-300 px-4 py-2 ">Symptoms</th>
                <th className="border border-blue-300 px-4 py-2 ">Date</th>
                <th className="border border-blue-300 px-4 py-2 ">Time</th>
              </tr>
            </thead>
            {appointments.map((appointment, index) => {
                return (
                    <tbody key={index}>
                        <tr className="text-zinc-600">
                            <td
                                className="border border-blue-300 px-4 py-2 text-red-500 cursor-pointer "
                                onClick={() => handleDelete(appointment._id)}
                            >
                                <MdDelete />
                            </td>
                            <td className="border border-blue-300 px-4 py-2 max-w-xs overflow-auto">
                                {appointment.patientName}
                            </td>
                            <td className="border border-blue-300 px-4 py-2">
                                {appointment.doctor}
                            </td>
                            <td className="border border-blue-300 px-4 py-2">
                                {appointment.symptoms}
                            </td>
                            <td className="border border-blue-300 px-4 py-2">
                                {appointment.date}
                            </td>
                            <td className="border border-blue-300 px-4 py-2">
                                {appointment.time}
                      </td>
                      <td className="border border-blue-300 px-4 py-2 text-blue-500 cursor-pointer"
                              onClick={() => handleEditClick(appointment._id)}
                            >
                                {editingAppointmentId === appointment._id ? (
                                  <div className="modal ">
                                    
                                  </div>
                        ) : 
                                <FaEdit />
                                }
                            </td>
                        </tr>
                    </tbody>
                );
            })}
          </table>
  )
}

export default AppointmentsList