import { useEffect, useState } from 'react'
// import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const AppointmentsList = () => {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  // const [doctors, setDoctors] = useState([]);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  const getAppointments = async () => {
    try {
      // const res = await fetch("http://localhost:8080/doc/appointments/all", {
        const res = await fetch('https://solarmed.onrender.com/doc/appointments/all', {
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

  // const getDoctors = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8080/admin/all/doctors", {
  //       // const res = await fetch('https://solarmed.onrender.com/admin/', {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // add the token to the Authorization header
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     setDoctors(data);
  //     console.log(data);

  //     if (!res.status === 200) {
  //       throw new Error(res.error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleEditClick = (appointmentId) => {
    setEditingAppointmentId(appointmentId);
  };

  const statusClick = async (id, status) => {
    try {
      // const response = await fetch(`http://localhost:8080/doc/appointments/edit/${id}`, {
      const response = await fetch(`https://solarmed.onrender.com/doc/appointments/edit/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          status: status,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditingAppointmentId(null);
      getAppointments();
    }
  }
    const handleDelete = async (id) => {
      console.log("delete " + id);
      try {
        // const res = await fetch(`http://localhost:8080/doc/appointments/delete/${id}`, {
      const res = await fetch(`https://solarmed.onrender.com/doc/appointments/delete/${id}`, {
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
      // getDoctors();
    }, []);

    return (
      <table className="table-auto border-collapse border border-blue-800">
        <thead className="text-zinc-800">
          <tr>
            <th className="border border-blue-300 px-4 py-2  max-w-xs "></th>
            <th className="border border-blue-300 px-4 py-2  max-w-xs ">
              Patient Name
            </th>
            {/* <th className="border border-blue-300 px-4 py-2 ">Doctor</th> */}
            <th className="border border-blue-300 px-4 py-2 ">Symptoms</th>
            <th className="border border-blue-300 px-4 py-2 ">Date</th>
            <th className="border border-blue-300 px-4 py-2 ">Time</th>
            <th className="border border-blue-300 px-4 py-2 ">Status</th>
          
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
                {/* <td className="border border-blue-300 px-4 py-2">
                                {appointment.doctor}
                            </td> */}
                <td className="border border-blue-300 px-4 py-2">
                  {appointment.symptoms}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {appointment.date}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {appointment.time}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {editingAppointmentId === appointment._id ? (
                    <select
                      name="status"
                      id="status"
                      className='bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-800'
                      onChange={(e) => statusClick(appointment._id, e.target.value)}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Complete</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <button
                      onClick={() => handleEditClick(appointment._id)}
                      className='bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-800'
                    >
                      {appointment.status}
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    )
  }

export default AppointmentsList