import { useEffect, useState } from "react";
import { MdOutlineEvent, MdOutlineAccessTime, MdOutlineLocalHospital, MdOutlineAssignment } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Retrieve the user's ID
  // const [userdata, setUserData] = useState();
  const doctorId = '65c77f720d6635ebef2cb998'; 
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    patientName:'',
    patient: '',
    doctor: '',
    date: '',
    time: '',
    status: 'Scheduled',
    symptoms: '',
    type: '',
  });

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);

  // Get the current date and time
  const currentDateTime = new Date();

  // Check if the appointment date and time are in the future
  if (appointmentDateTime <= currentDateTime) {
    alert('Invalid appointment details: Date and time must be in the future');
    return;
  }
    try {
      const response = await fetch("http://localhost:8080/doc/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...appointment,
         patient: userId, // Include the user's ID
        doctor: doctorId,}),
      });
      if (!response.ok) {
      throw new Error('Server responded with an error');
    }
      const data = await response.json();
      // if (!data || response.status === 400) {
      //   alert("Invalid appointment details");
      // } else {
      //   alert("Appointment created successfully");
      //   navigate("/");
      // }
      alert("Appointment created successfully");
    navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid appointment details");
    }
  };

const callAppointment = async() => { 
    try {
      const token = localStorage.getItem('token'); // get the token from local storage
      const res = await fetch('http://localhost:8080/doc/appointment', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // add the token to the Authorization header
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
        // setUserData(data);
      if (!res.status === 200) { 
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }
  useEffect(() => {
    callAppointment();
},[])

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Appointment</h2>
        <form method="POST">
          <div className="mb-4 flex gap-2 items-center">
            <label htmlFor="patient" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineLocalHospital />
            </label>
            <input
              type="text"
              id="patientName"
              placeholder="Patient Name"
              name="patientName"
              value={appointment.patientName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
              required
            />
          </div>
          {/* <div className="mb-4 flex gap-2 items-center">
            <label htmlFor="patient" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineLocalHospital />
            </label>
            <input
              type="text"
              id="patient"
              placeholder="Patient ID"
              name="patient"
              value={appointment.patient}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
              required
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
            <label htmlFor="doctor" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineLocalHospital />
            </label>
            <input
              type="text"
              id="doctor"
              placeholder="Doctor ID"
              name="doctor"
              value={appointment.doctor}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
              required
            />
          </div> */}
          <div className="mb-4 flex gap-2 items-center">
            <label htmlFor="date" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineEvent />
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointment.date}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
              required
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
            <label htmlFor="time" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineAccessTime />
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={appointment.time}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
              required
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
            <label htmlFor="symptoms" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineAssignment />
            </label>
            <input
              type="text"
              id="symptoms"
              name="symptoms"
              placeholder="Symptoms"
              value={appointment.symptoms}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
              required
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
            <label htmlFor="type" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineAssignment />
            </label>
            <select
              id="type"
              name="type"
              value={appointment.type}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
              required
            >
              <option value="">Select Type</option>
              <option value="Check-up">Check-up</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#4598af] text-white py-2 px-4 rounded-md hover:bg-[#1c748a] focus:outline-none focus:bg-[#1c748a]"
          >
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
