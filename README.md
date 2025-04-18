# 🛰️ Order Tracking MVP

A simple MERN stack MVP to demonstrate real-time order tracking + OTP-based delivery authentication.

---

## 🚀 Live Demo

Test both interfaces here:

- 🧑‍💼 [Delivery Agent View](https://your-agent-url.com)
- 🙋‍♂️ [Customer View](https://your-customer-url.com)

> Uses a pre-seeded demo order (`orderId: demo-1234`) with a fake customer location.

---

## ✅ Features

- Real-time delivery agent location tracking
- OTP-based delivery confirmation
- Leaflet map for visualizing movement
- Simple backend with one `Order` collection

---

## 📦 Tech Stack

- **Frontend**: React (Vite), Leaflet, Axios
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB Atlas (or local)
- **Deployment**: Render (backend), Vercel (frontend)

---

## 🛠️ To Run Locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 👀 Notes

- `orderId` is hardcoded to `demo-1234` for demo purposes.
- On a real app, it would be tied to logged-in users + their orders.
- Agent location updates every few seconds.
- OTP must be entered by agent to mark order as delivered.
