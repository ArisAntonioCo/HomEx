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

const FoodPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { expenses, totalBillAmount, loading, error } = useSelector(
    (state) => state.food
  );

  useEffect(() => {
    dispatch(fetchFoodExpenses());
  }, [dispatch, refreshKey]);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="foodpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}
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
          <div className="delete-confirmation-modal">
            <p>Are you sure you want to delete this expense?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
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
                <div className="total15">Total $</div>
              </div>
            </div>
            <div className="foodtotal1">${totalBillAmount}</div>
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
                <div className="loading-indicator">Loading expenses...</div>
              ) : error ? (
                <div className="error-message">Error: {error.message}</div>
              ) : (
                // Table Rows (dynamically generated)
                expenses.map((expense) => (
                  <div className="row5" key={expense.expenseId}>
                    <div className="table-cell8">{expense.billMonth}</div>
                    <div className="table-cell9">
                      {new Date(expense.datePaid).toISOString().slice(0, 10)}
                    </div>
                    <div className="table-cell10">${expense.billAmount}</div>
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
          />
        </div>
      )}
    </div>
  );
};

export default FoodPage;
