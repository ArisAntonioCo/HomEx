import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import AddModalFood from "../components/popups/add-modal-food";
import EditModalFood from "../components/popups/edit-modal-food";
import {
  fetchFoodExpenses,
  updateFoodExpense,
  deleteFoodExpense,
  addFoodExpense,
} from "../Redux/foodSlice";
import "./food-page.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ConfirmationDialog from '../components/popups/confirmationDialogue';

const FoodPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
  const dispatch = useDispatch();
  const { expenses, totalBillAmount, loading, error } = useSelector(
    (state) => state.food
  );

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const defaultStartDate = new Date(currentYear - 100, 0, 1); // 100 years before the current year
    const defaultEndDate = new Date(currentYear + 100, 11, 31); // 100 years after the current year
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    dispatch(
      fetchFoodExpenses({
        startDate: defaultStartDate,
        endDate: defaultEndDate,
      })
    );  }, [dispatch, refreshKey]);

  const handleEditClick = (expense) => {
    setSelectedExpenseId(expense);
    toggleEditModal();
  };

  const handleEditExpense = (updatedExpense) => {
    dispatch(updateFoodExpense(updatedExpense));
    setSelectedExpenseId(null);
    refreshTable();
  };

  const handleDeleteClick = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpenseId) {
      dispatch(deleteFoodExpense(selectedExpenseId));
      setSelectedExpenseId(null);
      refreshTable();
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAddExpense = (newExpense) => {
    dispatch(addFoodExpense(newExpense));
    refreshTable();
  };

  const refreshTable = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
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

  return (
    <div className="foodpage">
      {windowWidth > 768 ? <Sidebar /> : isDrawerOpen && <Drawer />}
      {successMessage && (
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
      )}
      <main className="food-panel">
        <header className="mobile-devices3" onClick={toggleDrawer}>
          <div className="container7">
            <img
              className="menu-icon3"
              loading="lazy"
              alt="Menu Icon"
              src="/menu.svg"
            />
          </div>
        </header>
        {showDeleteConfirmation && (
          <ConfirmationDialog
            mode="delete"
            title="Delete Confirmation"
            open={showDeleteConfirmation}
            handleCancel={handleCancelDelete}
            handleConfirm={handleConfirmDelete}
          />
        )}
        <section className="container8">
          <div className="foodcard1">
            <div className="label8">
              <img
                className="foodicon1"
                loading="lazy"
                alt=""
                src="/foodicon1@2x.png"
              />
              <h1 className="food1">Food</h1>
              <div className="total14">
                <div className="total15">Total ₱ </div>
              </div>
            </div>
            <div className="foodtotal1">₱ {totalBillAmount}</div>
          </div>

          <div className="container9">
            <div className="heading2">
              <div className="h15">
                <h2 className="expenses2">Expenses/</h2>
                <h2 className="food2">Food</h2>
              </div>
              <button className="addexbtn2" onClick={toggleAddModal}>
                <img className="vector-icon1" alt="" src="/vector-10.svg" />
                <div className="add-expense4">Add Expense</div>
              </button>
            </div>

            <div className="table2">
              <div className="row4">
                <div className="header-cell8">
                  <div className="service-provider">Item</div>
                </div>
                <div className="header-cell9">
                  <div className="date-paid">Date Paid</div>
                </div>
                <div className="header-cell10">
                  <div className="amount">Amount</div>
                </div>
                <div className="header-cell11">
                  <div className="action">Action</div>
                </div>
              </div>
              {/* Conditional Rendering for Table Data */}
              {loading ? (
                <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
              ) : error ? (
                <div className="error-message">Error: {error.message}</div>
              ) : (
                // Table Rows (dynamically generated)
                expenses.map((expense) => (
                  <div className="row5" key={expense.expenseId}>
                    <div className="table-cell8">{expense.billMonth}</div>
                    <div className="table-cell9">{expense.datePaid} </div>
                    <div className="table-cell10">₱ {expense.billAmount}</div>
                    <div className="table-cell11">
                      <div className="buttons2">
                        <button
                          className="edit-button"
                          onClick={() => handleEditClick(expense)}
                        >
                          <div className="edit2">Edit</div>
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => handleDeleteClick(expense.expensesId)}
                        >
                          <div className="delete2">Delete</div>
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "none" }}>{expense.expenseId}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {showAddModal && (
        <div className="modal-backdrop">
          <AddModalFood
            close={() => {
              toggleAddModal();
              refreshTable();
            }}
            onAddExpense={handleAddExpense}
            onSuccess={setSuccessMessage}
          />
        </div>
      )}
      {showEditModal && (
        <div className="modal-backdrop">
          <EditModalFood
            close={() => {
              toggleEditModal();
              refreshTable();
            }}
            expense={selectedExpenseId}
            onSave={handleEditExpense}
            onSuccess={setSuccessMessage}
          />
        </div>
      )}
    </div>
  );
};

export default FoodPage;
