import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import "./dashboard-page.css";
import { fetchElectricityExpenses } from "../Redux/electricitySlice";
import { fetchWaterExpenses } from "../Redux/waterSlice";
import { fetchMaintenanceExpenses } from "../Redux/maintSlice";
import { fetchFoodExpenses } from "../Redux/foodSlice";
import { fetchMiscellaneousExpenses } from "../Redux/miscSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (successMessage && !hasShown) {
      setOpen(true);
      setHasShown(true);
    }
  }, [successMessage, hasShown]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  // Use selectors for each expense category
  const {
    totalBillAmount: electricityTotal,
    loading: electricityLoading,
    error: electricityError,
  } = useSelector((state) => state.electricity);
  const {
    totalBillAmount: waterTotal,
    loading: waterLoading,
    error: waterError,
  } = useSelector((state) => state.water);
  const {
    totalBillAmount: foodTotal,
    loading: foodLoading,
    error: foodError,
  } = useSelector((state) => state.food);
  const {
    totalBillAmount: maintenanceTotal,
    loading: maintenanceLoading,
    error: maintenanceError,
  } = useSelector((state) => state.maintenance);
  const {
    totalBillAmount: miscellaneousTotal,
    loading: miscellaneousLoading,
    error: miscellaneousError,
  } = useSelector((state) => state.miscellaneous);

  // Improved date input validation and default dates
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    // Set default dates only if both are initially null
    if (!startDate && !endDate) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      dispatch(
        fetchElectricityExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  // Improved date input validation and default dates
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    // Set default dates only if both are initially null
    if (!startDate && !endDate) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      dispatch(
        fetchWaterExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  // Improved date input validation and default dates
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    // Set default dates only if both are initially null
    if (!startDate && !endDate) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      dispatch(
        fetchFoodExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  // Improved date input validation and default dates
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    // Set default dates only if both are initially null
    if (!startDate && !endDate) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      dispatch(
        fetchMaintenanceExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  // Improved date input validation and default dates
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    // Set default dates only if both are initially null
    if (!startDate && !endDate) {
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      dispatch(
        fetchMiscellaneousExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(fetchElectricityExpenses({ startDate, endDate }));
    }
    if (startDate && endDate) {
      dispatch(fetchWaterExpenses({ startDate, endDate }));
    }
    if (startDate && endDate) {
      dispatch(fetchFoodExpenses({ startDate, endDate }));
    }
    if (startDate && endDate) {
      dispatch(fetchMaintenanceExpenses({ startDate, endDate }));
    }
    if (startDate && endDate) {
      dispatch(fetchMiscellaneousExpenses({ startDate, endDate }));
    }
  }, [dispatch, startDate, endDate]);

  const calculateTotalExpenses = () => {
    let total = 0;

    // Convert totals to numbers, using 0 as the default if not a number
    const elecTotal = parseFloat(electricityTotal) || 0;
    const watTotal = parseFloat(waterTotal) || 0; // Changed variable name
    const fdTotal = parseFloat(foodTotal) || 0; // Changed variable name
    const maintTotal = parseFloat(maintenanceTotal) || 0; // Changed variable name
    const miscTotal = parseFloat(miscellaneousTotal) || 0; // Changed variable name

    total = elecTotal + watTotal + fdTotal + maintTotal + miscTotal;

    return total.toFixed(2); // Now total is guaranteed to be a number
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onNavlinksContainer2Click = useCallback(() => {
    navigate("/electricity-page");
  }, [navigate]);

  const onNavlinksContainer3Click = useCallback(() => {
    navigate("/water-page");
  }, [navigate]);

  const onNavlinksContainer4Click = useCallback(() => {
    navigate("/food-page");
  }, [navigate]);

  const onNavlinksContainer5Click = useCallback(() => {
    navigate("/maint-page");
  }, [navigate]);

  const onNavlinksContainer6Click = useCallback(() => {
    navigate("/misc-page");
  }, [navigate]);

  return (
    <div className="dashboardpage">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
      {windowWidth > 768 ? <Sidebar /> : isDrawerOpen && <Drawer />}
      <main className="dashboard-panel">
        <div className="mobile-devices2" onClick={toggleDrawer}>
          <div className="container6">
            <img
              className="menu-icon2"
              loading="lazy"
              alt="Menu Icon"
              src="/menu.svg"
            />
          </div>
        </div>
        <div className="headingcontainer">
          <div className="h14">
            <h1 className="dashboard">Dashboard</h1>
          </div>
          <div className="p">
            <div className="track-and-manage">
              Track and manage your home expenses
            </div>
          </div>
        </div>
        <div className="cardcontainer">
          <div className="topcardcontainer">
            <div className="electricitycard1">
              <div className="label2">
                <img
                  className="electricityicon1"
                  loading="lazy"
                  alt=""
                  src="/electricityicon1@2x.png"
                />
                <h1
                  className="electricity2"
                  onClick={onNavlinksContainer2Click}
                  style={{ cursor: "pointer" }}
                >
                  Electricity
                </h1>{" "}
                <div className="total8">
                  <div className="total9">Total $</div>
                </div>
              </div>
              <div className="date-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date(startDate)) {
                      alert("End date cannot be before start date");
                    } else {
                      setEndDate(e.target.value);
                    }
                  }}
                />
              </div>
              {electricityLoading ? (
                <div className="electricitytotal1">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              ) : electricityError ? (
                <div className="electricitytotal1">
                  Error: {electricityError.message}
                </div>
              ) : (
                <div className="electricitytotal1">${electricityTotal}</div>
              )}
            </div>
            <div className="watercard1">
              <div className="label3">
                <img
                  className="watericon1"
                  loading="lazy"
                  alt=""
                  src="/watericon1@2x.png"
                />
                <h1
                  className="electricity2"
                  onClick={onNavlinksContainer3Click}
                  style={{ cursor: "pointer" }}
                >
                  Water
                </h1>{" "}
                <div className="total6">
                  <div className="total7">Total $</div>
                </div>
              </div>
              <div className="date-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date(startDate)) {
                      alert("End date cannot be before start date");
                    } else {
                      setEndDate(e.target.value);
                    }
                  }}
                />
              </div>
              {waterLoading ? (
                <div className="watertotal1">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              ) : waterError ? (
                <div className="watertotal1">Error: {waterError.message}</div>
              ) : (
                <div className="watertotal1">${waterTotal}</div>
              )}
            </div>
            <div className="foodcard">
              <div className="label4">
                <img
                  className="foodicon"
                  loading="lazy"
                  alt=""
                  src="/foodicon@2x.png"
                />
                <h1
                  className="electricity2"
                  onClick={onNavlinksContainer4Click}
                  style={{ cursor: "pointer" }}
                >
                  Food
                </h1>{" "}
                <div className="total8">
                  <div className="total9">Total $</div>
                </div>
              </div>
              <div className="date-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date(startDate)) {
                      alert("End date cannot be before start date");
                    } else {
                      setEndDate(e.target.value);
                    }
                  }}
                />
              </div>
              {foodLoading ? (
                <div className="foodtotal">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              ) : foodError ? (
                <div className="foodtotal">Error: {foodError.message}</div>
              ) : (
                <div className="foodtotal">${foodTotal}</div>
              )}
            </div>
          </div>
          <div className="middlecardcontainer">
            <div className="maintenancecard">
              <div className="label5">
                <img
                  className="union-icon"
                  loading="lazy"
                  alt=""
                  src="/union@2x.png"
                />
                <h1
                  className="electricity2"
                  onClick={onNavlinksContainer5Click}
                  style={{ cursor: "pointer" }}
                >
                  Maintenance
                </h1>{" "}
                <div className="total10">
                  <div className="total11">Total $</div>
                </div>
              </div>
              <div className="date-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date(startDate)) {
                      alert("End date cannot be before start date");
                    } else {
                      setEndDate(e.target.value);
                    }
                  }}
                />
              </div>
              {maintenanceLoading ? (
                <div className="maintenancetotal">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              ) : maintenanceError ? (
                <div className="maintenancetotal">
                  Error: {maintenanceError.message}
                </div>
              ) : (
                <div className="maintenancetotal">${maintenanceTotal}</div>
              )}
            </div>
            <div className="misccard">
              <div className="label6">
                <img
                  className="miscicon"
                  loading="lazy"
                  alt=""
                  src="/miscicon@2x.png"
                />
                <h1
                  className="electricity2"
                  onClick={onNavlinksContainer6Click}
                  style={{ cursor: "pointer" }}
                >
                  Miscellaneous
                </h1>{" "}
                <div className="total12">
                  <div className="total13">Total $</div>
                </div>
              </div>
              <div className="date-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date(startDate)) {
                      alert("End date cannot be before start date");
                    } else {
                      setEndDate(e.target.value);
                    }
                  }}
                />
              </div>
              {miscellaneousLoading ? (
                <div className="misctotal">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              ) : miscellaneousError ? (
                <div className="misctotal">
                  Error: {miscellaneousError.message}
                </div>
              ) : (
                <div className="misctotal">${miscellaneousTotal}</div>
              )}
            </div>
          </div>
          <div className="bottomcardcontainer">
            <div className="totalexpensescard">
              <div className="label7">
                <h1 className="total-expenses">Total Expenses</h1>
                <img
                  className="expensesicon"
                  loading="lazy"
                  alt=""
                  src="/expensesicon@2x.png"
                />
              </div>

              <div className="expensestotal">${calculateTotalExpenses()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
