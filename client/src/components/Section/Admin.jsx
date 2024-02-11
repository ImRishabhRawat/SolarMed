import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const navigate = useNavigate();

const callAdmin = async() => { 
    try {
      const token = localStorage.getItem('token'); // get the token from local storage
      const res = await fetch('http://localhost:8080/doc/admin', {
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
      if (!res.status === 200) { 
        throw new Error(res.error);
      }
      if (data.role === "user" || data.role === "doctor") {
        console.log("You are not an Administrator");
        navigate("/login");
        
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }
  useEffect(() => {
    callAdmin();
},[])

  return (
    <div className="w-full min-h-screen bg-red-500">
      <h1>ADMIN PAGE</h1>
    </div>
  )
}

export default Admin
