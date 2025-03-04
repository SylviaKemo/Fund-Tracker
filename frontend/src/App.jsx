import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CampaignForm from "./forms/CampaignForm";
import DonationForm from "./forms/DonationForm";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/campaign-form" element={<CampaignForm />} />
              <Route path="/donation-form" element={<DonationForm />} />
              <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
