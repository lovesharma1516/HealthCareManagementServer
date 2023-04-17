import { useEffect, useState } from "react";
import axios from "axios";

const Patient = ({ post }) => {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    patientData();
    setTimeout(() => {

    }, 1000)
  }, []);

  const patientData = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/auth/patient").then((res) => {
        console.log(res.data);
        setPatient(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="card">
      {patient.map((item) => {
        <div className="card">
          <p>firstName: {item.firstName}</p>
          <p>lastName: {item.lastName}</p>
          <p>gender: {item.gender}</p>
          <p>dateOfBirth: {item.dateOfBirth}</p>
          <p>phoneNumber: {item.phoneNumber}</p>
          <p>email: {item.email}</p>
          <p>address: {item.address}</p>
          <p>medicalHistory: {item.medicalHistory}</p>
          <p>medications: {item.medications}</p>
          <p>allergies: {item.allergies}</p>
          <p>surgeries: {item.surgeries}</p>
        </div>
       })}
    </div>
  );
};

export default Patient; 
