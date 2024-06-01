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

  const [electricityStartDate, setElectricityStartDate] = useState(null);
  const [electricityEndDate, setElectricityEndDate] = useState(null);

  const [waterStartDate, setWaterStartDate] = useState(null);
  const [waterEndDate, setWaterEndDate] = useState(null);

  const [foodStartDate, setFoodStartDate] = useState(null);
  const [foodEndDate, setFoodEndDate] = useState(null);

  const [maintenanceStartDate, setMaintenanceStartDate] = useState(null);
  const [maintenanceEndDate, setMaintenanceEndDate] = useState(null);

  const [miscellaneousStartDate, setMiscellaneousStartDate] = useState(null);
  const [miscellaneousEndDate, setMiscellaneousEndDate] = useState(null);

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

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    if (!electricityStartDate && !electricityEndDate) {
      setElectricityStartDate(defaultStartDate);
      setElectricityEndDate(defaultEndDate);
      dispatch(
        fetchElectricityExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    if (!waterStartDate && !waterEndDate) {
      setWaterStartDate(defaultStartDate);
      setWaterEndDate(defaultEndDate);
      dispatch(
        fetchWaterExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    if (!foodStartDate && !foodEndDate) {
      setFoodStartDate(defaultStartDate);
      setFoodEndDate(defaultEndDate);
      dispatch(
        fetchFoodExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    if (!maintenanceStartDate && !maintenanceEndDate) {
      setMaintenanceStartDate(defaultStartDate);
      setMaintenanceEndDate(defaultEndDate);
      dispatch(
        fetchMaintenanceExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1);
    const defaultEndDate = new Date(currentYear, 11, 31);

    if (!miscellaneousStartDate && !miscellaneousEndDate) {
      setMiscellaneousStartDate(defaultStartDate);
      setMiscellaneousEndDate(defaultEndDate);
      dispatch(
        fetchMiscellaneousExpenses({
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (electricityStartDate && electricityEndDate) {
      dispatch(
        fetchElectricityExpenses({
          startDate: electricityStartDate,
          endDate: electricityEndDate,
        })
      );
    }
    if (waterStartDate && waterEndDate) {
      dispatch(
        fetchWaterExpenses({ startDate: waterStartDate, endDate: waterEndDate })
      );
    }
    if (foodStartDate && foodEndDate) {
      dispatch(
        fetchFoodExpenses({ startDate: foodStartDate, endDate: foodEndDate })
      );
    }
    if (maintenanceStartDate && maintenanceEndDate) {
      dispatch(
        fetchMaintenanceExpenses({
          startDate: maintenanceStartDate,
          endDate: maintenanceEndDate,
        })
      );
    }
    if (miscellaneousStartDate && miscellaneousEndDate) {
      dispatch(
        fetchMiscellaneousExpenses({
          startDate: miscellaneousStartDate,
          endDate: miscellaneousEndDate,
        })
      );
    }
  }, [
    dispatch,
    electricityStartDate,
    electricityEndDate,
    waterStartDate,
    waterEndDate,
    foodStartDate,
    foodEndDate,
    maintenanceStartDate,
    maintenanceEndDate,
    miscellaneousStartDate,
    miscellaneousEndDate,
  ]);

  const calculateTotalExpenses = () => {
    let total = 0;

    // Convert totals to numbers, using 0 as the default if not a number
    const elecTotal = parseFloat(electricityTotal) || 0;
    const watTotal = parseFloat(waterTotal) || 0; 
    const fdTotal = parseFloat(foodTotal) || 0; 
    const maintTotal = parseFloat(maintenanceTotal) || 0; 
    const miscTotal = parseFloat(miscellaneousTotal) || 0; 

    total = elecTotal + watTotal + fdTotal + maintTotal + miscTotal;

    return total.toFixed(2); 
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
                  value={electricityStartDate}
                  onChange={(e) => setElectricityStartDate(e.target.value)}
                />
                
                <input
                  type="date"
                  value={electricityEndDate}
                  onChange={(e) => {
                    if (
                      new Date(e.target.value) < new Date(electricityStartDate)
                    ) {
                      alert("End date cannot be before start date");
                    } else {
                      setElectricityEndDate(e.target.value);
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
                  value={waterStartDate}
                  onChange={(e) => setWaterStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={waterEndDate}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date(waterStartDate)) {
                      alert("End date cannot be before start date");
                    } else {
                      setWaterEndDate(e.target.value);
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
                  value={foodStartDate}
                  onChange={(e) => setFoodStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={foodEndDate}
                  onChange={(e) => {
                    if (new Date(e.target.value) < new Date(foodStartDate)) {
                      alert("End date cannot be before start date");
                    } else {
                      setFoodEndDate(e.target.value);
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
                  value={maintenanceStartDate}
                  onChange={(e) => setMaintenanceStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={maintenanceEndDate}
                  onChange={(e) => {
                    if (
                      new Date(e.target.value) < new Date(maintenanceStartDate)
                    ) {
                      alert("End date cannot be before start date");
                    } else {
                      setMaintenanceEndDate(e.target.value);
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
                  value={miscellaneousStartDate}
                  onChange={(e) => setMiscellaneousStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={miscellaneousEndDate}
                  onChange={(e) => {
                    if (
                      new Date(e.target.value) <
                      new Date(miscellaneousStartDate)
                    ) {
                      alert("End date cannot be before start date");
                    } else {
                      setMiscellaneousEndDate(e.target.value);
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
