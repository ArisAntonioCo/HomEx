import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import Drawer from "../components/drawer";
import AddModalWater from "../components/popups/add-modal-water";
import EditModalWater from "../components/popups/edit-modal-water";
import {
  fetchWaterExpenses,
  updateWaterExpense,
  deleteWaterExpense,
  addWaterExpense
} from "../Redux/waterSlice";
import "./water-page.css";

const WaterPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { expenses, totalBillAmount, loading, error } = useSelector(
    (state) => state.water
  );

  useEffect(() => {
    dispatch(fetchWaterExpenses());
  }, [dispatch, refreshKey]);

  const handleEditClick = (expense) => {
    setSelectedExpenseId(expense);
    toggleEditModal();
  };

  const handleEditExpense = (updatedExpense) => {
    dispatch(updateWaterExpense(updatedExpense));
    setSelectedExpenseId(null);
    refreshTable();
  };

  const handleDeleteClick = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowDeleteConfirmation(true);
  };
  
  const handleConfirmDelete = () => {
    if (selectedExpenseId) {
      dispatch(deleteWaterExpense(selectedExpenseId));
      setSelectedExpenseId(null);
      refreshTable();
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAddExpense = (newExpense) => {
    dispatch(addWaterExpense(newExpense));
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
    <div className="waterpage">
      <Sidebar />
      {isDrawerOpen && <Drawer />}
      <main className="water-panel">
        <header className="mobile-devices" onClick={toggleDrawer}>
          <div className="container">
            <img className="menu-icon" loading="lazy" alt="" src="/menu.svg" />
          </div>
        </header>
        {showDeleteConfirmation && (
        <div className="delete-confirmation-modal">
          <p>Are you sure you want to delete this expense?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
        <section className="container1">
          <div className="watercard">
            <div className="label">
              <img className="watericon" loading="lazy" alt="" src="/watericon@2x.png" />
              <h1 className="water">Water</h1>
              <div className="total">
                <div className="total1">Total $</div>
              </div>
            </div>
            <div className="watertotal">${totalBillAmount}</div>
          </div>

          <div className="container2">
            <div className="heading">
              <div className="h1">
                <h2 className="expenses">Expenses/</h2>
                <h2 className="water">Water</h2>
              </div>
              <button className="addexbtn" onClick={toggleAddModal}>
                <img className="vector-icon" alt="" src="/vector-10.svg" />
                <div className="add-expense">Add Expense</div>
              </button>
            </div>

            <div className="table">
              <div className="row">
                <div className="header-cell">
                  <div className="service-provider">Service Provider</div>
                </div>
                <div className="header-cell">
                  <div className="date-paid">Date Paid</div>
                </div>
                <div className="header-cell">
                  <div className="amount">Amount</div>
                </div>
                <div className="header-cell">
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
                  <div className="row" key={expense.expenseId}>
                    <div className="table-cell">{expense.billMonth}</div>
                    <div className="table-cell">{new Date(expense.datePaid).toISOString().slice(0,10)}</div>
                    <div className="table-cell">${expense.billAmount}</div>
                    <div className="table-cell">
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(expense)}
                      >
                        Edit
                      </button>
                      
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteClick(expense.expensesId)}
                      >
                        Delete
                      </button>
                    </div>
                    <div style={{display: 'none'}}>{expense.expenseId}</div>
                  </div>
                ))
              )}
              
            </div>
          </div>
        </section>
      </main>

      {showAddModal && (
        <div className="modal-backdrop">
          <AddModalWater
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
          <EditModalWater 
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

export default WaterPage;