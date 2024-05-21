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
import WaterPage from "./pages/water-page";
import SignupPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import FaqPage from "./pages/faq-page";
import AboutPage from "./pages/about-page";
import DashboardPage from "./pages/dashboard-page";
import FoodPage from "./pages/food-page";
import MaintPage from "./pages/maint-page";
import MiscPage from "./pages/misc-page";
import ElectricityPage from "./pages/electricity-page";

axios.defaults.baseURL = "https://asia-east2-homex-dd7bb.cloudfunctions.net/api";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/water-page":
        title = "";
        metaDescription = "";
        break;
      case "/signup-page":
        title = "";
        metaDescription = "";
        break;
      case "/login-page":
        title = "";
        metaDescription = "";
        break;
      case "/faq-page":
        title = "";
        metaDescription = "";
        break;
      case "/about-page":
        title = "";
        metaDescription = "";
        break;
      case "/electricity-page":
        title = "";
        metaDescription = "";
        break;
      case "/dashboard-page":
        title = "";
        metaDescription = "";
        break;
      case "/food-page":
        title = "";
        metaDescription = "";
        break;
      case "/maint-page":
        title = "";
        metaDescription = "";
        break;
      case "/misc-page":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Provider store={store}>

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/water-page" element={<WaterPage />} />
      <Route path="/signup-page" element={<SignupPage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/faq-page" element={<FaqPage />} />
      <Route path="/about-page" element={<AboutPage />} />
      <Route path="/electricity-page" element={<ElectricityPage />} />
      <Route path="/dashboard-page" element={<DashboardPage />} />
      <Route path="/food-page" element={<FoodPage />} />
      <Route path="/maint-page" element={<MaintPage />} />
      <Route path="/misc-page" element={<MiscPage />} />
    </Routes>
    </Provider>

  );
}
export default App;
