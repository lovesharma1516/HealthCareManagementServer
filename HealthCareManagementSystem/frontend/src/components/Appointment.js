import { useEffect, useState } from "react";
import axios from "axios";

const Appointment = ({ post }) => {
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    appointmentData();
    setTimeout(() => {

    }, 1000)
  }, []);

  const appointmentData = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/auth/appointment").then((res) => {
        console.log(res.data);
        setAppointment(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="card">
      {appointment.map((item) => {
        <div className="card">
          <p>Patient: {item.patient}</p>
          <p>Doctor: {item.doctor}</p>
          <p>Appointment Date: {item.appointmentDate}</p>
          <p>Reason: {item.reason}</p>
          <p>Status: {item.status}</p>
        </div>
       })}
    </div>
  );
};

export default Appointment; 
