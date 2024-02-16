import { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaUserDoctor } from 'react-icons/fa6'
import { GrSchedules } from 'react-icons/gr'
import UserList from './UserList'
import AppointmentsList from './AppointmentsList'
import DoctorList from './DoctorList'

const AdminPanel = () => {
  const [view, setView] = useState('users');
  const [clicked, setClicked] = useState('Users');
  return (
    <div className='w-full min-h-screen '>
      <div className="pt-32 pb-2 md:pt-40 mx-auto max-w-7xl border-b-2">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setView('users');
              setClicked("Users");
            }
            }
            className={`flex items-center gap-x-2 px-4 py-2 border-2 border-zinc-400 rounded-full ${clicked === "Users" ? "bg-blue-400" : ""}`}
          >
            Users
            <FaUsers />
          </button>
          <button
            onClick={() => {
              setView('appointments');
              setClicked("Appointments");
            }}
            className={`flex items-center gap-x-2 px-4 py-2 border-2 border-zinc-400 rounded-full  ${clicked === "Appointments" ? "bg-blue-400" : ""}`}
          >
            Appointments
            <GrSchedules />
          </button>
          <button
            onClick={() => {
              setView('doctors');
            setClicked("Doctors");
            }}
            className={`flex items-center gap-x-2 px-4 py-2 border-2 border-zinc-400 rounded-full  ${clicked === "Doctors" ? "bg-blue-400" : ""} `}
          >
            Doctors
            <FaUserDoctor />
          </button>
        </div>
      </div>
      <div className="w-full min-h-screen mt-5 max-w-7xl mx-auto mb-5">
         {view === 'users' && <UserList />}
      {view === 'appointments' && <AppointmentsList />}
      {view === 'doctors' && <DoctorList />}
      </div>
    </div>
  )
}

export default AdminPanel
