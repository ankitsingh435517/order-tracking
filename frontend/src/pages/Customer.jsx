import React, { useEffect, useState } from "react";
import API from "../api";
import MapView from "../components/MapView";

const orderId = "demo-1234"; // replace with real orderId

const Customer = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await API.get(`order/${orderId}`);
      setOrder(data);
    };

    fetchOrder();

    // Poll every 5 seconds to get live agent movement
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div style={{ padding: "1rem", width: "90vw", height: "80vh" }}>
      <h2 style={{ textAlign: "center" }}>Customer Interface</h2>
      <MapView
        agentLocation={order.agentLocation}
        customerLocation={order.customerLocation}
      />
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p>
          <strong>OTP:</strong> {order.otp}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {order.isDelivered ? "Delivered ✅" : "On the way 🚚"}
        </p>
      </div>
    </div>
  );
};

export default Customer;
