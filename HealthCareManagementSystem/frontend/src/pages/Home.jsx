import Patient from "../components/Patient";
import Appointment from "../components/Appointment";
import Billing from "../components/Billing";
import axios from "axios";

import { useState, useEffect } from "react";
const Home = () => {

  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [billing, setBilling] = useState([]);


  useEffect(() => {
    patientData();
    appointmentData();
    billingData();
    setTimeout(()=>{
        getUser();

    },1000)
   
  }, []);

  const getUser = () => {
    fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Patient Function
  const patientData = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/auth/patient").then((res) => {
        // console.log("PAtient Data", res.data[0].firstName);
        setPatient(res.data)
        console.log(res.data)
        // setPatient(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  //Appointment Function
  const appointmentData = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/auth/appointment").then((res) => {
        console.log("PAtient Appointment ",res.data);
        setAppointment(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  //Billing Function
  const billingData = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/auth/billing").then((res) => {
        console.log(res.data);
        setBilling(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="display">
      <div className="home">
        {user ? (
          patient.map((item, index) => {
            return (
              <div className="card">
          <h1>Patient Information</h1>
          <p>firstName: {item.firstName}</p>
          <p>lastName: {item.lastName}</p>
          <p>gender: {item.gender}</p>
          <p>dateOfBirth: {item.dateOfBirth}</p>
          <p>phoneNumber: {item.phoneNumber}</p>
          <p>email: {item.email}</p>
          <p>address: {item.address.city}</p>
          <p>medicalHistory: {item.medicalHistory}</p>
          <p>medications: {item.medications}</p>
          <p>allergies: {item.allergies}</p>
          <p>surgeries: {item.surgeries}</p>
              </div>
            )
          })
        ) : (
          <h3>"Please!! Login First to Explore the Dashboard"</h3>
        )}
      </div>

      <div className="home">
        {user ? (
          appointment.map((item, index) => {
            return (
              <div className="card">
              <h1>Appointment Scheduling</h1>
              <p>Patient: {item.patient}</p>
              <p>Doctor: {item.doctor}</p>
              <p>Appointment Date: {item.appointmentDate}</p>
              <p>Reason: {item.reason}</p>
              <p>Status: {item.status}</p>
              </div>
            )
          })
        ) : (
          <h3></h3>
        )}
      </div>

      <div className="home">
        {user ? (
          billing.map((item, index) => {
            return (
              <div className="card">
              <h1>Billing & Insurance</h1>
              <p>Patient: {item.patient}</p>
              <p>Doctor: {item.doctor}</p>
              <p>Appointment: {item.appointment}</p>
              <p>Billing Date: {item.billingDate}</p>
              <p>Amount: {item.amount}</p>
              <p>Insurance: {item.insurance}</p>
              <p>Policy Number: {item.policyNumber}</p>
              </div>
            )
          })
        ) : (
          <h3></h3>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;
