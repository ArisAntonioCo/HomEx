import { useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/landing-page";
import DeptPage from "./pages/dept-page";
import SignupPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";
import JobPage from "./pages/job-page";
import PayrollPage from "./pages/payroll-page";
import EmployeePage from "./pages/employee-page";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Provider store={store}>

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dept-page" element={<DeptPage />} />
      <Route path="/signup-page" element={<SignupPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/employee-page" element={<EmployeePage />} />
      <Route path="/dashboard-page" element={<DashboardPage />} />
      <Route path="/job-page" element={<JobPage />} />
      <Route path="/payroll-page" element={<PayrollPage />} />
    </Routes>
    </Provider>

  );
}
export default App;
