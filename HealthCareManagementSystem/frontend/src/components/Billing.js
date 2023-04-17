import { useEffect, useState } from "react";
import axios from "axios";

const Billing = ({ post }) => {
  const [billing, setBilling] = useState([]);

  useEffect(() => {
    billingData();
    setTimeout(() => {

    }, 1000)
  }, []);

  const billingData = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/auth/billing").then((res) => {
        console.log(res.data);
        setBilling(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="card">
      {billing.map((item) => {
        <div className="card">
          <p>Patient: {item.patient}</p>
          <p>Doctor: {item.doctor}</p>
          <p>Appointment: {item.appointment}</p>
          <p>Billing Date: {item.billingDate}</p>
          <p>Amount: {item.amount}</p>
          <p>Insurance: {item.insurance}</p>
          <p>Policy Number: {item.policyNumber}</p>
        </div>
       })}
    </div>
  );
};

export default Billing; 
