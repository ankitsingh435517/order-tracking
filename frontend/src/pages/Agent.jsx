import React, { useEffect, useState } from "react";
import API from "../api";
import MapView from "../components/MapView";

const orderId = "demo-1234"; // replace with real orderId

const Agent = () => {
  const [customerLocation, setCustomerLocation] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const loc = { lat: latitude, lng: longitude };
        setAgentLocation(loc);

        await API.post("/location/update", { orderId, agentLocation: loc });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await API.get(`/order/${orderId}`);
      setCustomerLocation(data.customerLocation);
    };
    fetchOrder();
  }, []);

  const handleVerify = async () => {
    try {
      const res = await API.post("/order/verify", {
        orderId,
        enteredOtp: otp,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying OTP!");
    }
  };

  return (
    <div style={{ padding: "1rem", width: "90vw", height: "80vh" }}>
      <h2 style={{ textAlign: "center" }}>Agent Interface</h2>
      {agentLocation && (
        <MapView
          agentLocation={agentLocation}
          customerLocation={customerLocation}
        />
      )}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="button" onClick={handleVerify}>
          Mark Delivered
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Agent;
