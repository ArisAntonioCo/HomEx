import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import "./dashboard-page.css";
import { fetchElectricityExpenses } from "../Redux/electricitySlice";
import { fetchWaterExpenses } from "../Redux/waterSlice";
import { fetchMaintenanceExpenses } from "../Redux/maintSlice";
import { fetchFoodExpenses } from "../Redux/foodSlice";
import { fetchMiscellaneousExpenses } from "../Redux/miscSlice";

const DashboardPage = () => {
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
    // Fetch data for all expense categories
    dispatch(fetchElectricityExpenses());
    dispatch(fetchWaterExpenses());
    dispatch(fetchFoodExpenses());
    dispatch(fetchMaintenanceExpenses());
    dispatch(fetchMiscellaneousExpenses());
  }, [dispatch]);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        // Assuming 768px as a threshold for full screen
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="dashboardpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}
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
                <h1 className="electricity2">Electricity</h1>
                <div className="total8">
                  <div className="total9">Total $</div>
                </div>
              </div>
              {electricityLoading ? (
                <div className="electricitytotal1">Loading...</div>
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
                <h1 className="water2">Water</h1>
                <div className="total6">
                  <div className="total7">Total $</div>
                </div>
              </div>
              {waterLoading ? (
                <div className="watertotal1">Loading...</div>
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
                <h1 className="food">Food</h1>
                <div className="total8">
                  <div className="total9">Total $</div>
                </div>
              </div>
              {foodLoading ? (
                <div className="foodtotal">Loading...</div>
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
                <h1 className="maintenance">Maintenance</h1>
                <div className="total10">
                  <div className="total11">Total $</div>
                </div>
              </div>
              {maintenanceLoading ? (
                <div className="maintenancetotal">Loading...</div>
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
                <h1 className="miscellaneous">Miscellaneous</h1>
                <div className="total12">
                  <div className="total13">Total $</div>
                </div>
              </div>
              {miscellaneousLoading ? (
                <div className="misctotal">Loading...</div>
              ) : miscellaneousError ? (
                <div className="misctotal">Error: {miscellaneousError.message}</div>
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
