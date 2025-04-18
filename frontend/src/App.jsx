import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Agent from "./pages/Agent";
import Customer from "./pages/Customer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/agent" element={<Agent />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;
